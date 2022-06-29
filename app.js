let express = require('express');
let app = express();
 const mongo = require('mongodb')
 const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 8230
 const mongoUrl = "mongodb+srv://pradeepgoud:qVCrPh8XVbIq1bkz@cluster0.tojfe.mongodb.net/?retryWrites=true&w=majority"



 const bodyParser = require('body-parser');
 const cors = require('cors');
 const token = "8fbf8tyyt87378";
 
 // middleware
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json())
 app.use(cors())
 

// middleware




app.get('/',(req,res) => {
    res.send("Welcome to Express");
})

app.get('/data/',(req,res) => {
    let query ={};
    let categoryid = Number(req.query.category_id)
    if(categoryid){
    query = {"category_id": categoryid}
    }
    
    db.collection('data').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
app.get('/scroller',(req,res) => {

    db.collection('scroller').find().toArray((err,result) => {
     if(err) throw err;
     res.send(result)
 })
 })
 app.get('/tv',(req,res) => {
    let query = {}
    let genres = req.query.genres;
    let channel = req.query.channel
    let languageid = Number(req.query.languageid)
    let age = (req.query.age)
    if(genres){
        query={"genres":genres}
    }
    else if(channel){
        query={"channel":channel}
    }
    else if(age){
        query={"age":age}
    }
    else if(languageid){
        query={"languages.langauage_id":languageid}
    }

    db.collection('tv').find(query).toArray((err,result) => {
     if(err) throw err;
     res.send(result)
 })
 })
 app.get('/movies',(req,res) => {
    let query ={}
    let genres = req.query.genres;
    
    let languageid = Number(req.query.languageid)
    let age = (req.query.age)
    if(genres){
        query={"genres":genres}
    }
    
    else if(age){
        query={"age":age}
    }
    else if(languageid) {
        query={"languages.langauage_id":languageid}
    }
    db.collection('movies').find(query).toArray((err,result) => {
     if(err) throw err;
     res.send(result)
 })
 })
 app.get('/sports',(req,res) => {
    let query ={}
    let sporttype = req.query.sporttype;
    if(sporttype){
        query={"sport":sporttype}
    }
    db.collection('sports').find(query).toArray((err,result) => {
     if(err) throw err;
     res.send(result)
 })
 })
 app.get('/disney',(req,res) => {
    let query = {}
    let genres = req.query.genres;
    let channel = req.query.channel
    let languageid = Number(req.query.languageid)
    let age = (req.query.age)
    if(genres){
        query={"genres":genres}
    }
    else if(channel){
        query={"channel":channel}
    }
    else if(age){
        query={"age":age}
    }
    else if(languageid){
        query={"languages.langauage_id":languageid}
    }

    db.collection('disney').find(query).toArray((err,result) => {
     if(err) throw err;
     res.send(result)
 })
 })
 //kids
 app.get('/kids',(req,res) => {
     let query ={}

    let channel = req.query.channel
    let languageid = Number(req.query.languageid)
    let age = (req.query.age)
    if(channel){
        query={"channel":channel}
    }
    else if(age){
        query={"age":age}
    }
    else if(languageid) {
        query={"languages.langauage_id":languageid}
    }

    db.collection('kids').find(query).toArray((err,result) => {
     if(err) throw err;
     res.send(result)
 })
 })
 //total
 app.get('/total',(req,res) => {

    let query ={}
    let year = Number(req.query.year);
    if(year){
        query ={
            "year":year
        }
    }
    db.collection('total').find(query).toArray((err,result) => {
     if(err) throw err;
     res.send(result)
 })
 })

 //homebar
 app.get('/homebar',(req,res) => {
    let query = {}
    let genres = req.query.genres;
    let channel = req.query.channel
    let languageid = Number(req.query.languageid)
    if(genres){
        query={"genres":genres}
    }
    else if(channel){
        query={"channel":channel}
    }
    else{
        query={"languages.langauage_id":languageid}
    }

    db.collection('total').find(query).toArray((err,result) => {
     if(err) throw err;
     res.send(result)
 })
 })
 // genres
 


app.get('/details/:id',(req,res) => {
    let params = Number(req.params.id);

   db.collection('total').find({"v_id":params}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
})
})

app.post('/subscribe',(req,res)=>{
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err ;
        res.send('order placed')
    })
})
app.get('/subscribe',(req,res)=>{
    db.collection('orders').find().toArray((err,result)=>{
        if(err) throw err ;
        res.send(result)
    })
})



MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log(`Error while connecting`);
    db = client.db('hotstar');
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`)
    })
});
