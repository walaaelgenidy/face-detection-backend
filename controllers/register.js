const handleRegister = (req,res,bcrypt ,db)=>{
    const { email , name , password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password); 
    db.transaction(trx =>{
     trx.insert({
        hash: hash,
        email:email
      })
      .into('login') //  we can use the loginEmail after we've updated the log and table to update the loginEmail so we don't really change anything.You create a transaction when you have to do more than two things at once,
      .returning('email')
      .then(loginEmail =>{
       return trx('users')
       .returning('*')
       .insert({
         email: loginEmail[0],
         name:name,
         joined: new Date()
       })
       .then(user =>{
         res.json(user[0]); //to ensure thats an object not an array
        })
      }).then(trx.commit)
      .catch(trx.rollback);
    })
     

    .catch(err =>
      res.status(400).json('unable to register'))
    }

    module.exports = {
        handleRegister : handleRegister
    };

