const {
    Api
} = require("../models");
const { Log } = require("../libs/log")
const { IntenalError } = require("../libs/error")
const apisvclog = new Log("ApiSvc")
const rolesvc = require("./RoleService")
const Sequelize = require('sequelize');
const Op = Sequelize.Op
Function.prototype.getName = function () {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}
async function addApi(name, content, projectId, minLevel) {
    let exists = await checkExists(name, projectId)
    if (exists) {
        apisvclog.error(`[${arguments.callee.getName()}] Api already exists ${[name,content,projectId,minLevel].join("|")}`)
        throw new IntenalError("Api already exists")
    }
    let res = Api.create({
        name,
        content,
        projectId,
        minLevel
    })
    return true
}

async function checkExists(name, projectId) {
    apisvclog.info(`${name},${projectId}`)
    let res = await Api.findOne({
        where: {
            name,
            projectId
        }
    })
    // apisvclog.info(JSON.stringify(res))
    if (res) {
        return true
    }
    return false
}

async function updateApi(name, content, projectId, minLevel) {
    let res = await Api.update({
        content,
        minLevel
    }, {
        name,
        projectId
    })
    if (!res) {
        apisvclog.error(`[${arguments.callee.getName()}] update api error ${[name,content,projectId,minLevel].join("|")}`)
        throw new IntenalError("update api error")
    }
    return true
}

async function deleteApi(name, projectId) {
    let res = await Api.desdroy({
        name,
        projectId
    })
    return res
}

async function getAvailableApis(currentLevel, projectId) {
    //获取当前的等级能获得的所有api
    let res = await Api.findAndCountAll({
        where: {
            projectId,
            minLevel:{
                [Op.lte]:currentLevel
            }
            // [Op.lte]: {"minLevel":currentLevel}
        }
    })
    res.rows = res.rows.map((item) => {
        return item.dataValues
    })
    return res.rows
}

async function getApisByRole(rolename,projectId){
    let role = await rolesvc.getRole(rolename,projectId)
    let level = role.level
    let res = await getAvailableApis(level,projectId)
    return res
}

module.exports={
    getAvailableApis,
    deleteApi,
    updateApi,
    addApi,
    getApisByRole
}