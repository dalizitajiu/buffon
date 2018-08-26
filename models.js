const Sequelize = require('sequelize');
const sequelize = new Sequelize("buffon", "root", "dalizi1992", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Role = sequelize.define('role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    roleName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    projectId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
    }
})
const Api = sequelize.define('api', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    projectId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    minLevel:{
        type:Sequelize.INTEGER,
        allowNull:false
    }

})

const User = sequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    roleName:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue:"user10"
    },
    projectId:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

sequelize.sync()

exports.Api = Api
exports.Role = Role