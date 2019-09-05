const express = require('express');
const app = express();
const massive = require('massive')
require('dotenv').config();
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const {getAll, getOne, update, create, remove} = require('./productsController')


massive(process.env.CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance);
    console.log('db connected');
}).catch(err => {
    console.log(err)
})

app.use(express.json());

//endpoints
app.post('/api/products', create);
app.get('/api/products', getAll);
app.get('/api/products/:id', getOne);
app.put('/api/products/:id', update);
app.delete('/api/products/:id', remove);


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));