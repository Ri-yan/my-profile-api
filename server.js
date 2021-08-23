
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db=knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  }
});


const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  db.select('*').from('users').then(data=>{
  res.send(data);
});

app.post('/message', (req, res) => {
const {email,name,message}=req.body;
 db('users')
 .returning('*')
  .insert({
    name:name,
    email:email,
    message:message,
    joined: new Date()
 })
  .then(user=>{
    res.json(user[0]);
  })
  .catch(err=>res.status(400).json(err));
})

app.listen(process.env.PORT || 3000,() => {
  console.log(`app is running on port ${process.env.PORT}`)
})
