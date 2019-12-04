//COP 4331
//Group 2
//Project 11
//Secure Messaging App

//Connor Austin
//Andrew Glisson
//Jacob Davis
//Austin Pena
//Lukas Getter

//requirements
const MongoClient = require('mongodb').MongoClient
const crypto = require('crypto');
const aes = require('aes256')
const randomInt = require('random-int');
const url = 'mongodb+srv://group2:poosd@cluster0-nu8c7.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})
var stdin = process.openStdin();
const readline = require('readline');

var seed = 1;
let n,p,msg
let secretKey;
let loggedInUser = "";
let adminBase = 71
let adminMod = 13
let hashedPassword
let base,mod,generatedKey

//adjust login specifications to whatever you desire

//gets the base and mod values from the database
function checkBaseAndMod(db){
  return new Promise((resolve,reject) => {
    db.collection('admin').find({base: adminBase, mod: adminMod}).toArray((err,items) => {
      err ? reject(err) : resolve(items[0])
    })
  })
}

//sets the current logged in user to the username
function setLoggedInUser(name){
  return new Promise((resolve,reject) => {
    loggedInUser = name
    resolve(0)
  })
}

//only called when backend is started for the first time and there is no base or mod value
function InsertBaseAndMod(db){
  return new Promise((resolve,reject) => {
    console.log("Inserting new BASE and MOD")
    db.collection('admin').insertOne({base: adminBase, mod: adminMod}, (err,res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

//sets users logged in status to false
function loggedOut(username, hashedPassword, db){
  var obj = new Promise((resolve,reject) => {
    db.collection('users').updateOne({user: username, password: hashedPassword}, {$set: {loggedIn: false}}, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
  return obj
}

function login(username, password, db){
  
  return new Promise((resolve,reject) => {
    
    //collections
    const coll = db.collection('users')
    const admincoll = db.collection('admin')

    //hashed password is a combination of both the username and password
    let hash = crypto.createHash('sha256');
    hash.update(password + username)
    hashedPassword = hash.digest('hex').toString()
    
    //gets a user object from the databse with the intention of checking login status
    function checkUser() {
      var obj = new Promise((resolve,reject) => {
        coll.find({user: username}).toArray((err,items) => {
          err ? reject(err) : resolve(items[0])
        })
      })
      return obj
    }

    //inserts a new user in the databse
    function createUser(){
      return new Promise((resolve,reject) => {
        coll.insertOne({user: username, password: hashedPassword, gen: 0, loggedIn: false}, (err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }

    
    //gets the base and mod values used for encryption, these remain constant
    function getAdminCreds(){
      var obj = new Promise((resolve,reject) => {
        admincoll.find({base: adminBase, mod: adminMod}).toArray((err,items) => {
          err? reject(err) : resolve(items[0])
        })
      })
      return obj
    }

    //updates the users gen value, a new value is assigned each time they login
    function updateGen(){
      var obj = new Promise((resolve,reject) => {
        coll.updateOne({user: username, password: hashedPassword}, {$set: {gen: generatedKey}}, (err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
      return obj
    }

    //sets users logged in status to true
    function loggedIn(){
      var obj = new Promise((resolve,reject) => {
        db.collection('users').updateOne({user: username}, {$set: {loggedIn: true}}, (err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
      return obj
    }
    
    //checks if a user is logged in
    function CheckloggedIn(){
      var obj = new Promise((resolve,reject) => {
        db.collection('users').find({user: username}).toArray((err, res) => {
          err ? reject(err) : resolve(res[0]['loggedIn']);
        }) 
      })
      return obj
    }

    async function caller(){
      //completely random number as the secret key
      secretKey = parseInt(randomInt(1,10))
      
      var result = await checkUser()
      while(!result)
      {
        console.log("User doesn't exist, creating now")
        await createUser()
        result = await checkUser()
      }
      
      if(result['password'] == hashedPassword){

        //checks to see if a user is already logged in
        var isLoggedin = await CheckloggedIn()
        if(isLoggedin){
          //if they are already logged in, exit
          console.log("User is already logged in!");
          process.exit()
        }
        //else, login normally
        await loggedIn()
        await setLoggedInUser(result['user'])
        

        console.log("Logged in! Welcome, " + result['user'])
        
      }
      else{
        console.log("Invalid username or password!")
          process.exit()
      }
      //mod is a very large prime number
      //base is any primitive root of mod
      //these numbers can be public

      result = await getAdminCreds()
      base = parseInt(result['base'])
      mod = parseInt(result['mod'])

      //console.log("BASE^secret: " + BigInt(Math.pow(base,secretKey)))
      generatedKey = parseInt(((base ** secretKey) % mod))
      //console.log(generatedKey)
      //PROBLEM WITH updateGen()
      await updateGen()
      resolve(0)

    }
    ///////THIS FUNCTION RUNS ALL LOGIN FUNCTIONS////////
    caller()
  })

  /////////////////////////////////////////////////////
}

let sendMessage = function(message,sender,recipient, deleteAfter, db){
  //deleteAfter is in seconds

  return new Promise((resolve,reject) => {

    let encryptedMessage, recipientGen, senderGen;


  //gets generated key from sender for the exchange, this key can be sent over the network
  function getSenderGen(){
    var obj = new Promise((resolve,reject)=>{
      db.collection('users').find({user: sender}).toArray((err,items) => {
        err ? reject(err) : resolve(items[0]['gen'])
      })
    })
    return obj
  }

  //gets generated key from recipient for the exchange, this key can be sent over the network
  function getRecipientGen(){
    var obj = new Promise((resolve,reject)=>{
      db.collection('users').find({user: recipient}).toArray((err,items) => {
        err ? reject(err) : resolve(items[0]['gen'])
      })
    })
    return obj
  }


  //message is pushed to the database
  function pushMessage(){
    var obj = new Promise((resolve,reject) => {
      db.collection('messages').insertOne({
        message: encryptedMessage,
        sender: sender, 
        recipient: recipient,
        senderGen: senderGen, 
        recipientGen: recipientGen,
        time: new Date(),
        deleteAfter: deleteAfter}, (err,res) => {
        err ? reject(err) : resolve(res)
      })
    })
    return obj
  }
  
  //message is encrypted and then sent to the recipient
  async function caller(){
    
    let key = parseInt(seed).toString()
    senderGen = parseInt(await getSenderGen())
    recipientGen = parseInt(await getRecipientGen())
    let encryptionKey = ((parseInt(senderGen) ** parseInt(secretKey)) % parseInt(mod)).toString()
    encryptedMessage = await aes.encrypt(key,message)
    
    var result = await pushMessage()
    resolve(0)
  }
  
  caller()
  })
}

function receiveMessage(recipient, sender, db){

  return new Promise((resolve,reject) => {
    var decryptedMessage = ''

    //pulls the most recent message to the recipient from the database
    function getMessage(){
      var obj = new Promise((resolve,reject) => {
        var item = db.collection('messages').find({recipient:recipient}).sort({time:-1}).limit(1).toArray((err,item)=>{
          err ? reject(err) : resolve(item[0])
        })
      })
      return obj
    }


    //If a new message gets added, it will be decrypted and displayed to the recipient
    async function caller(){
      let key = parseInt(seed).toString()
      var result = await getMessage()
      var senderGen = parseInt(result['senderGen'])
      var encryptedMessage = result['message']
      let encryptionKey = await ((senderGen ** Number(secretKey)) % Number(mod)).toString()
      decryptedMessage = await aes.decrypt(key, encryptedMessage)
      console.log(sender + ": " + decryptedMessage)
      resolve(0)
    }

    caller()
  })
}

function askQuestion(question){

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(question, ans => {
    if(ans == ""){ans = " "}
    if(ans.length > 1000){ans = ans.substr(0,1000)}

    rl.close();
    resolve(ans);
  }))
}

// MAIN CONNECTION


client.connect(err => {
  err ? console.log("COULD NOT CONNECT") : console.log("CONNECTION SUCCESSFUL")

    async function main(){

      const db = client.db('SecureApp')
      if(!(await checkBaseAndMod(db))){
        await InsertBaseAndMod(db)
      }
      db.collection('messages').watch().on('change', next => {
        if(next['operationType'] == 'insert'){
          let sender = next['fullDocument']['sender']
          let recipient = next['fullDocument']['recipient']
          if(recipient == loggedInUser){ receiveMessage(loggedInUser,sender,db) }
        }
        if(next['operationType'] == 'delete'){
        }
      })
      //LOGIN PROMPTS
      
      n = await askQuestion("Username: ")
      p = await askQuestion("Password: ")
      
      await login(n,p,db) //logs in the user

      let r = await askQuestion("Recipient: ")

      var result = await checkBaseAndMod(db);
      if(!result){await InsertBaseAndMod(db)}
      //SEND MESSAGE LOOP

      while(true){
        msg = await askQuestion("> ")
        if(msg == "/logout"){ await loggedOut(n,hashedPassword,db); process.exit() }
        await sendMessage(msg, loggedInUser,r ,20,db)
      }
        
    }

    main()

})
