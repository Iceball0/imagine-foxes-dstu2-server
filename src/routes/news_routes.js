const router = require('express').Router();
const News = require('../data/News');

router.post('/', async (req, res) => {
    try {
        await News.create(req.body);

        return res.status(200).send({msg: "Успешно"});
    } catch (error) {
        return console.log(error);
    }
})

router.get('/', async (req, res) => {
    const news = await News.findAll();

    return res.status(200).send({news: news, msg: "Успешно" });
})

router.get('/:newsId', async (req, res) => {
    news_id = req.params.newsId;

    const news = await News.findOne({ where: { id: news_id } });

    if (news) {
        return res.status(200).send({news: news, msg: "Успешно" });
    }

    return res.status(404).send({msg: "Новость не найдена"});
})

router.put('/:newsId', async (req, res) => {
    news_id = req.params.newsId;

    const news = await News.findOne({ where: { id: news_id } });

    if (news) {

        await news.update(req.body);
        return res.status(200).send({msg: "Успешно" });
    }
    return res.status(404).send({msg: "Новость не найдена"});

})

router.delete('/:newsId', async (req, res) => {
    news_id = req.params.newsId;

    const news = await News.findOne({ where: { id: news_id } });

    if (news) {

        await news.destroy(req.body);
        return res.status(200).send({msg: "Успешно" });
    }
    return res.status(404).send({msg: "Новость не найдена"});

})

module.exports = router;