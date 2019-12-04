const mongo = require('mongodb').MongoClient
const url = 'mongodb+srv://group2:poosd@cluster0-nu8c7.mongodb.net/test?retryWrites=true&w=majority'

function deleteMessage(id,db){
    return new Promise((resolve,reject) => {
        db.collection('messages').deleteOne({_id:id}, (err,res) => {
            err ? reject(err) : resolve(res)
        })
    })
}

function getMessages(db){
    return new Promise((resolve,reject) => {
        db.collection('messages').find().toArray((err,items)=>{
            err ? reject(err) : resolve(items)
        })
    })
}

async function run(db){
    while(true){
        let currentDate = await new Date()
        let messages = await getMessages(db)

        for(let i = 0; i < messages.length; i++){
            if(messages[i]['deleteAfter'] == -1){continue;}
            else if((currentDate - messages[i]['time']) >= messages[i]['deleteAfter'] * 1000){
                await deleteMessage(messages[i]['_id'],db)
                console.log("Message Deleted")
            }
            
        }
    }
}

mongo.connect(url, {useNewUrlParser: true, useUnifiedTopology:true},(err,client) => {
    const db = client.db('SecureApp')
    run(db)
})