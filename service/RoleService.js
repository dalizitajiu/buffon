
const { Role } = require("../models")
const {Log} = require("../libs/log")
const {IntenalError} = require("../libs/error")
const rolesvclog=new Log("RoleSvc")
Function.prototype.getName = function () {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}
async function addRole(level, roleName, projectId, description) {
    let ok = await checkExist(roleName, projectId)
    if (ok) {
        rolesvclog.error(`[${arguments.callee.getName()}] role already exists`)
        throw new IntenalError("role already exists")
    }
    let res = await Role.create({
        level,
        roleName,
        projectId,
        description
    })
    return true
}

async function updateRole(level, roleName, projectId, description) {
    //更新角色
    let res = await Role.update({
        level,
        description
    }, {
        roleName,
        projectId
    })
    if (!res) {
        rolesvclog.error(`[${arguments.callee.getName()}] update error ${level}|${roleName}|${projectId}|${description}`)
        throw new IntenalError(`update error ${level}|${roleName}|${projectId}|${description}`)
    }
    return res
}

async function checkExist(roleName, projectId) {
    let res = await Role.findOne({
        where: {
            roleName,
            projectId
        }
    })
    if (res) {
        return true
    }
    return false
}

async function getRole(roleName, projectId) {
    let res = await Role.findOne({
        where: {
            roleName,
            projectId
        }
    })
    rolesvclog.info(`[${arguments.callee.getName()}] results:${JSON.stringify(res.dataValues)}`)
    return res.dataValues
}

async function getRoles(projectId) {
    let res = await Role.findAndCountAll({
        where: {
            // roleName, 
            projectId
        },
        attributes: ["id","roleName","projectId","level","description"],
        // limit: 5
    })
    res.rows = res.rows.map((item) => {
        return item.dataValues
    })
    rolesvclog.info(`[${arguments.callee.getName()}] results:${JSON.stringify(res)}`)
    return res
}
/*
addRole(10, "testlevel", "1", "测试等级").then((res) => {
    console.log(res)
    getRoles("testlevel", "1")
}).catch((err) => {
    console.log("shit fuck")
    console.log(err)
})
*/
exports.addRole = addRole
exports.getRoles = getRoles
exports.updateRole = updateRole
exports.checkExist = checkExist
exports.getRole = getRole