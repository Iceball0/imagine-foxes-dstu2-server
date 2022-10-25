const app = require('./app');
const sequelize = require('./data/database');

sequelize.sync().then(() => console.log('db is ready'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});