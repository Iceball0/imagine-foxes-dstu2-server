const router = require('express').Router();
const User = require('../data/Users');
const Messages = require('../data/Messages');
const Excel = require('../data/Excel');

const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config')
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {

    const user = await User.findOne({ where: { login: req.body.login } });
    if (user) {
        return res.status(409).send({msg: "Пользователь с таким логином уже существует"})
    }

    const req_user = {
        login: req.body.login,
        surname: req.body.surname,
        name: req.body.name,
        permission: req.body.permission,
        hashed_password: "",
    }

    try {

        const hashed = await bcrypt.hash(req.body.password, 10);
        req_user.hashed_password = hashed;

        await User.create(req_user);

        const accessToken = jwt.sign({
            login: req_user.login,
            surname: req_user.surname,
            name: req_user.name,
            permission: req_user.permission
        }, JWT_SECRET, { expiresIn: "7d" });

        await User.update({access_token: accessToken}, {
            where: { login: req_user.login }
        })

        return res.status(200).send({msg: "Успешно"});

    } catch (error) {
        return console.log(error);
    }
})

router.post('/login', async (req, res) => {
    req_login = req.body.login;

    const user = await User.findOne({ where: { login: req_login } });

    if (user) {
        const isValidPass = await bcrypt.compare(req.body.password, user.hashed_password);

        if (isValidPass) {
            const accessToken = jwt.sign({
                login: user.login,
                surname: user.surname,
                name: user.name,
                permission: user.permission
            }, JWT_SECRET, { expiresIn: "7d" });

            await User.update({access_token: accessToken}, {
                where: { login: user.login }
            })

            return res.status(200).send({token: accessToken, remember: req.body.remember, msg: "Успешно"});
        }
    } 

    return res.status(401).send({msg: "Неправильный логин или пароль"});
})

router.use('/news', require('./news_routes'));


router.post('/timetable',  async (req, res) => {
    var id = 0;
    if (req.body.role === "student") {
        id = 1;
    } else if (req.body.role === "teacher") {
        id = 2
    }

    const table = await Excel.findOne({ where: { id: id } });

    if (table) {
        await Excel.update({table: req.body.table}, {
            where: { where: { id: id } }
        })
    
        return res.status(200).send({msg: "Успешно"});
    }

    await Excel.create({ table: req.body.table });

    return res.status(200).send({msg: "Успешно"});
})

router.get('/timetable/:tableId',  async (req, res) => {
    const table = await Excel.findOne({ where: { id: req.params.tableId } });

    if (table) {
        return res.status(200).send({table: table.table, msg: "Успешно" });
    }

    return res.status(404).send({msg: "Таблица не найдена"});
})

router.get('/messages', async (req, res) => {
    const msg = await Messages.findAll();

    return res.status(200).send({messages: msg, msg: "Успешно" });
})

router.get('/messages/:recieverId', async (req, res) => {
    const msg = await Messages.findAll({ where: { recieverId: req.params.recieverId } });;

    return res.status(200).send({messages: msg, msg: "Успешно" });
})

router.post('/messages', async (req, res) => {
    try {
        await Messages.create(req.body);

        return res.status(200).send({msg: "Успешно"});
    } catch (error) {
        return console.log(error);
    }
})

router.get('/roles', async (req, res) => {
    const req_user = await User.findAll({ where: { permission: req.body.permission } });
    
    return res.status(200).send({users: user, msg: "Успешно" });
})



module.exports = router;