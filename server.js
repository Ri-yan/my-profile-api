
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'psql',
    database : 'profile'
  }
});



const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  console.log(res.send(db.users));
})

app.post('/message', (req, res) => {
  const {email,name,message}=req.body;
  // database.users.push({
  //   id:'124',
  //   name:name,
  //   email:email,
  //   message:message
  // })
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

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})


// const database={
//   users:[
//   {
//     id:'1',
//     name:'riyan',
//     email:'abc@123',
//     message:'hello'
//   },
//   {
//     id:'2',
//     name:'Jacob',
//     email:'abc@123',
//     message:'bye'
//   }
//   ]
// }