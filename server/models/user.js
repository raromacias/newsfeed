const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
      User: sequelize.define('user', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
          },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING,
        location: DataTypes.STRING
      })
}