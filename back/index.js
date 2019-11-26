require('dotenv').config()
const app = require('./app')

app.listen(process.env.PORT, () => {
    console.log(`conecting to the ${process.env.PORT}`);
});