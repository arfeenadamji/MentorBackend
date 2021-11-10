const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');


const User = require('./models/user')
app.use(bodyParser.json())

const Message = require('./models/message')
app.use(bodyParser.json())

const mongooseUrl = "mongodb+srv://Arfeen:abcd1234@cluster0.spvug.mongodb.net/Mentor";

mongoose.connect(mongooseUrl)

mongoose.connection.on('connected', () => {
    console.log('connnected to mongo')
});
mongoose.connection.on('error', (err) => {
    console.log('this is error', err);
});

app.get('/', (req, res) => {
    res.send("Welcome to node js ec2")
})

// // new user
app.post('/signUp', async (req, res) => {
  console.log('res', req.body)
    let newUser = new User()
    newUser.firstName = req.body.firstName
    newUser.lastName = req.body.lastName
    newUser.contact = req.body.contact
    newUser.email = req.body.email
    newUser.password = await bcrypt.hash(req.body.pass, 10)
    newUser.DOB = req.body.date
    newUser.degree = req.body.degree
    newUser.skills = req.body.skill
    newUser.gender = req.body.gender
    newUser.userType = req.body.userType
  let user1 = newUser.skills.split(",")
// console.log('newUser', user1)
    newUser.save((err, doc) => {
        console.log('err from new user',err)
        // console.log('doc', doc)
    });
    res.send("welcome to app")
});

// //validate User
app.post('/signIn', async (req, res) => {
    await User.find({ email: req.body.email }).exec(async (err, resp) => {
        if (err) {
            console.log('err from validate user', err)
        }
        else {
            if (resp.length > 0) {
                let ismatch = bcrypt.compareSync(req.body.pass, resp[0].password)
                if (ismatch) {
                    return res.send({ message: 'user exist', status: true, data: resp })
                } else {
                    return res.send({ message: 'invalid password', status: false, data: resp })
                }
            } else {
                res.send({ message: 'user not found', status: false, data: resp })
            }
        }
    })
})

// get User Data
app.get('/getUser', async(req,res) =>{
    // console.log("req body from get user", req.body)
    await User.find().exec((err, resp) =>{
        if(err){
            console.log('err from get user', err)
        }
        else{
            // console.log('res from get user', resp)
            if(res > 0){
                res.send({message:'user data exist', status:true, data:resp})
            } else{
                res.send({message:'user doesnot exist' , status:true, data:resp})
            }
        }
    })
})

// get Message
app.post('/getMessage', async(req, res) =>{
    console.log('req body from get message', req.body.mentorId)
    await Message.find({userId:req.body.userId}).populate('mentorId').exec((err, resp) =>{
        if(err){
            console.log('err form get message',err)
        }
        else{
            let newMessage = new Message()
            newMessage.message = req.body.message
            newMessage.userId = req.body.userId
            newMessage.mentorId = req.body.mentorId

            newMessage.save((err, doc) =>{
                if(err){
                console.log('err from get message', err)
                }
                // else{console.log('doc from get message', doc)}
            });
        }
    })
})

// getMenteesDetail
app.post('/getMenteesDetail', async(req,res) =>{
    console.log("req.body from get Mentees detail", req.body)
    // let myId = req.body.userId;
    // let query = {}
    // if (myId) {
    //     query = { userId: myId }
    // }
    // console.log('userId:req.body.userId._id', myId)
    await Message.find({mentorId:req.body.mentorId}).populate('userId').exec((err, resp) => {
        if (err) {
            console.log('err finding from mentees details', err)
        }
        else {
            console.log('user from mentees detail', resp)
            if (resp.length > 0) {
                res.send({ message: 'user exist', status: true, data: resp })
            } else {
                res.send({ message: 'user not found', status: false, data: resp })
            }
        }
    })})


app.listen(4000, () => {
    console.log('server start')
});