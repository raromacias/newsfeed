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
    image_url: DataTypes.STRING,
    link: DataTypes.STRING,
    pubDate: DataTypes.STRING,
    source_id: DataTypes.STRING,
    title: DataTypes.STRING
  })
}