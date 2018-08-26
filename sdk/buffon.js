// import { resolve } from "url";

const request = require("request")
const { URLSearchParams } = require('url');
class buffon {

    constructor(env = "") {
        this.HOST = "127.0.0.1:3000"
    }

    addApi(projectId, name, minlevel, content) {
        let url = "/api/addApi"
        let data = {
            projectId,
            name,
            minlevel,
            content
        }
        return this._post(url, {}, data)
    }

    updateApi(projectId, name, minlevel, content) {
        let url = "/api/updateApi"
        let data = {
            projectId,
            name,
            minlevel,
            content
        }
        return this._post(url, {}, data)
    }

    deleteApi(projectId, name) {
        let url = "/api/deleteApi"
        let data = {
            projectId,
            name
        }
        return this._post(url, {}, data)
    }

    getApiList(projectId, level) {
        let url = "/availableApi"
        let query = {
            projectId,
            level
        }
        return this._get(url, query)
    }

    getApisByRole(projectId, rolename) {
        let url = "/getApisByRole"
        let query = {
            projectId,
            rolename
        }
        return this._get(url, query)
    }

    addRole(rolename, level, projectId, description) {
        let url = "/role/addRole"
        let data = {
            rolename,
            level,
            projectId,
            description
        }
        return this._post(url, {}, data)
    }
    getProjectRoles(projectId) {
        let url = "/role/projectRoles"
        let query = {
            projectId
        }
        return this._get(url, query)
    }
    updateRole(projectId, level, rolename, description) {
        let url = "/role/updateRole"
        let data = {
            projectId,
            level,
            rolename,
            description
        }
        return this._post(url, {}, data)
    }
    getUserInfo(projectId, rolename) {
        let url = "/role/userinfo"
        let query = {
            projectId,
            rolename
        }
        return this._get(url, query)
    }
    _get(url, query) {
        let queryobj = new URLSearchParams(query)
        return new Promise((resolve, reject) => {
            request.get(this._genUrl(`${url}?${queryobj.toString()}`), (err, resp, body) => {
                if (err) {
                    reject(err)
                }
                resolve(body)
            })
        })
    }
    _genUrl(path = "") {
        let sep = "/"
        if (path.length == 0 || path[0] == "/") {
            sep = ""
        }
        return `${this.HOST}${this.sep}${path}`
    }
    _post(url, query, data) {
        let queryobj = new URLSearchParams(query)
        return new Promise((resolve, reject) => {
            request.post(this._genUrl(`${url}?${queryobj.toString()}`), form = data, (err, resp, body) => {
                if (err) {
                    // console.log(err)
                    reject(err)
                } 
                resolve(body)
            })
        })

    }
}