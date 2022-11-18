const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
      User: sequelize.define('user', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING,
        location: DataTypes.STRING
      })
}