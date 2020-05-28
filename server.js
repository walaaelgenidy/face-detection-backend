const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'facedetection'
  }
});
 

const app = express();
app.use(bodyParser.json())
app.use(cors())

const dataBase ={
    users:[
    { 
        id:'123',
        name:'walaa',
        email:'walaa@gmail.com',
        password:'walaa@1997',
        entries:0,
        joined: new Date()
    },
      { 
        id:'1234',
        name:'ahmed',
        email:'ahmed@gmail.com',
        password:'ahmed@1997',
        entries:0,
        joined: new Date()
}
]
} 

app.get('/',(req, res)=>{res.send(dataBase.users);
  });
  app.post('/signin',(req,res)=>{signin.handleSignin(req ,res , bcrypt ,db) //pass to handleSignin
  })
  app.post('/register' ,(req,res)=> {register.handleRegister(req ,res , bcrypt ,db) //pass to handleregister
  })
  app.get('/profile/:id',(req, res)=>{profile.handleProfile(req ,res , db) //pass to handleProfile
  })
 app.put('/image',(req,res)=>{image.handleImage(req ,res , db) //pass to handleImage
 })
 app.post('/imageurl',(req,res)=>{image.handleApiCall(req ,res) //pass to handleApiCall
 })
  
 app.listen(5000,()=>{
    console.log("app is running");
})





/*
/--> res = this is working
/signin --post = success/fail
/register--post = user 
/profile user_id  get user
/image end point put --> user object 
*/
