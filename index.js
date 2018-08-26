const fastify = require("fastify")()
const vali = require("./libs/validate")
const { Log } = require("./libs/log")
const rolesvc = require("./service/RoleService")
const apisvc = require("./service/ApiService")
fastify.register(require('fastify-url-data'), (err) => {
  if (err) {
    console.log(err)
    throw err
  }
})

fastify.register(require('fastify-formbody'), (err) => {
  if (err) {
    console.log(err)
    throw err
  }
})

const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          errno: {
            type: 'number',
          },
          errmsg: {
            type: 'string',
          },
          data: {
            type: "object",
          }
        }
      }
    }
  }
}
const indexlog = new Log("index")
function genResp(opt = {}) {
  let res = {}
  res.errno = opt.errno || 0
  res.errmsg = opt.errmsg || ""
  res.data = opt.data || {}
  indexlog.info(JSON.stringify(res))
  return res
}

fastify.addHook('preHandler', function (req, reply, next) {
  indexlog.info(`query:${JSON.stringify(req.query)}`)
  indexlog.info(`body:${JSON.stringify(req.body)}`)
  // console.log(req.body)
  reply.header('Content-Type', 'application/json').code(200)
  next()
})

fastify.register(function (instance, opts, next) {
  instance.post("/addApi", opts, async (req, reply) => {
    try {
      let body = req.body
      let name = vali.requireLengthBetween(body.name, 0, 20)
      let content = vali.requireLengthBetween(body.content, -1, 100)
      let prjid = vali.requireNotNull(body.projectId)
      let minlevel = vali.requireInArray(body.minlevel, ["10", "20", "30", "40"])
      let res = await apisvc.addApi(name, content, prjid, minlevel)
      reply.send(genResp({ data: res }))
    } catch (err) {
      indexlog.error(err.toString())
      reply.send(genResp({ errno: err.id, errmsg: err.msg }))
    }
  })

  instance.post("/updateApi", opts, async (req, reply) => {
    try {
      let body = req.body
      let name = vali.requireLengthBetween(body.name, 0, 20)
      let content = vali.requireLengthBetween(body.content, -1, 100)
      let prjid = vali.requireNotNull(body.projectId)
      let minlevel = vali.requireInArray(body.minlevel, ["10", "20", "30", "40"])
      let res = await apisvc.updateApi(name, content, prjid, minlevel)
      reply.send(genResp({ data: res }))
    }
    catch (err) {
      indexlog.error(err.toString())
      reply.send(genResp({ errno: err.id, errmsg: err.msg }))
    }
  })
  instance.post("/deleteApi", opts, async (req, reply) => {
    try {
      let body = req.body
      let name = vali.requireNotNull(body.name)
      let prjid = vali.requireNotNull(body.projectId)
      let res = await apisvc.deleteApi(name,prjid)
      reply.send(genResp({data:res}))
    } catch (err) {
      indexlog.error(err.toString())
      reply.send(genResp({ errno: err.id, errmsg: err.msg }))
    }
  })
  instance.get("/availableApi", opts, async (req, reply) => {
    try {
      let query = req.query
      let prjid = vali.requireNotNull(query.projectId)
      let level = vali.requireInArray(query.level,["10","20","30","40"])
      let res = await apisvc.getAvailableApis(level, prjid)
      reply.send(genResp({ data: res }))
    }
    catch (err) {
      indexlog.error(err.toString())
      reply.send(genResp({ errno: err.id, errmsg: err.msg }))
    }
  })
  instance.get("/getApisByRole",opts,async (req,reply)=>{
    try {
     let query = req.query
     let rolename = vali.requireNotNull(query.rolename)
     let prjid = vali.requireNotNull(query.projectId)
     let res =await apisvc.getApisByRole(rolename,prjid)
     reply.send(genResp({data:res})) 
    } catch (err) {
      indexlog.error(err.toString())
      reply.send(genResp({ errno: err.id, errmsg: err.msg }))
    }
  })
  next()
}, { prefix: "/api" })

fastify.register(function (instance, opts, next) {
  instance.get('/userinfo', opts, async (req, reply) => {
    try {
      let query = req.query
      let rolename = vali.requireNotNull(query.rolename)
      let prjid = vali.requireNotNull(query.projectId)
      let res = await rolesvc.getRole(rolename, prjid)
      reply.send(genResp({ data: res }))
    } catch (err) {
      indexlog.error(err.toString())
      reply.send(genResp({ errno: err.id, errmsg: err.msg }))
    }
  })
  instance.get("/projectRoles", opts, async (req, reply) => {
    try {
      let query = req.query
      let prjid = vali.requireNotNull(query.projectId)
      let res = await rolesvc.getRoles(prjid)
      reply.send(genResp({ data: res }))
    } catch (err) {
      indexlog.error(err.toString())
      reply.send(genResp({ errno: err.id, errmsg: err.msg }))
    }
  })
  instance.post("/addRole", opts, async (req, reply) => {
    try {
      let body = req.body;
      let level = vali.requireInArray(body.level, ["10", "20", "40", "80"])
      let rolename = vali.requireLengthBetween(body.rolename, 5, 20)
      let prjid = vali.requireGt(body.projectId, 0)
      let desc = vali.requireLengthBetween(body.description, -1, 100)
      let res = await rolesvc.addRole(level, rolename, prjid, desc)
      reply.send(genResp())
    } catch (err) {
      indexlog.error(err.toString())
      reply.send(genResp({ errno: err.id, errmsg: err.msg }))
    }
  })

  instance.post("/updateRole", opts, async (req, reply) => {
    try {
      let body = req.body;
      let level = vali.requireInArray(body.level, ["10", "20", "40", "80"])
      let rolename = vali.requireLengthBetween(body.rolename, 5, 20)
      let prjid = vali.requireGt(body.projectId, 0)
      let desc = vali.requireLengthBetween(body.description, -1, 100)
      let res = await rolesvc.updateRole(level, rolename, prjid, desc)
      reply.send(genResp())
    } catch (error) {
      indexlog.error(err.toString())
      reply.send(genResp({ errno: err.id, errmsg: err.msg }))
    }
  })
  

  next()
}, { prefix: '/role' })

// fastify.get('/',opts,function(req,reply){
//     reply.header('Content-Type','application/json').code(200)
//     reply.send()
// })
console.log("fuck shit")
fastify.listen(3000, err => {
  if (err) {
    console.log(err)
    throw err
  }
  console.log(`server listening on ${fastify.server.address().port}`)
})
