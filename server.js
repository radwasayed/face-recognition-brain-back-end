const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '1234',
        database : 'smart-brain'
    }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users)
});

app.post('/signin', signin.handelSignin(bcrypt, db));

app.post('/register', register.handleRegister(bcrypt, db));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen(3005, () => {
    console.log("app is running on port 3005");
});


/*
*   /              ==> res  = this is working
* /signin          ==> POST = success or fail
* /register        ==> Post = user
* /profile/:userId ==> Get  = user
* /image           == > PUT = user
*
* */





