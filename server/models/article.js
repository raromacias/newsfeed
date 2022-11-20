const {
  DataTypes
} = require('sequelize')

const {
  sequelize
} = require('../util/database')

module.exports = {
  Article: sequelize.define('article', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: DataTypes.STRING,
    urlToImage: DataTypes.STRING,
    url: DataTypes.STRING,
    publishedAt: DataTypes.STRING,
    title: DataTypes.STRING
  })
}