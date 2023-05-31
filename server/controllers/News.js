const {Article} = require('../models/article')
const {User} = require('../models/user')

module.exports = {
  getCurrentUserArticles: async (req, res) => {
    try {
        const {userId} = req.params
        const articles = await Article.findAll({
            where: {userId},
            include: [{
                model: User,
                required: true,
                attributes: ['username']
            }]
        })
            res.status(200).send(articles)
    } catch (error) {
        console.log('ERROR IN getUserArticles')
        console.log(error)
        res.sendStatus(400)  
    }
}, 
  
  
  addArticle: async (req,res) => {
    try {
      const { 
        description,
        image,
        url,
        date,
        title
      } = req.body;
        const {userId} = req.params
        await Article.create({
          description,
          image,
          url,
          date,
          title,
          userId
        })
            res.sendStatus(200) 
    } catch (error) {
      console.log('Error in adding article to Favorites')
      res.sendStatus(400)
    }
  },

  deleteArticle: async (req, res) => {
    try{ 
     const {id} = req.params
     await Article.destroy({where:{id: +id}})
     res.sendStatus(200)
 }catch (error) {
     console.log('ERROR IN deleting article from favorites')
      console.log(error)
        res.sendStatus(400)
 }
}

}

