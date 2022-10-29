const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')


const app = express();
app.use(cors());
app.use(bodyparser.json());

//database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root',
    database: 'sampledb',
    port: 3306
});

//checking database connection
db.connect((err) => {
    if (err) {
        console.log(err, 'dberr');
    } else { console.log('database connected...'); }
});

//get  all data in the database 
app.get('/user', (req, res) => {
    let qr = `select * from user`;
    db.query(qr, (err, result) => {

        if (err) {

            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                massege: 'all user data',
                data: result
            })
        }
    });
})


//get single data in the database 
app.get('/user/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `select * from user where id=${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result.length > 0) {
            res.send({
                massege: 'get single data',
                data: result
            })
        }
        else {
            res.send({
                massege: 'data not found'
            })
        }

    })

})

//Creat new data
app.post('/user', (req, res) => {
    console.log(req.body, 'createdata');
    // let id = req.body.id;
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let Password = req.body.Password;
 

    let qr = `insert into user(fullname,email,mobile,Password)
           value('${fullname}','${email}','${mobile}','${Password}')`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            massege: 'data inserted',
        })
    })
})


//update single data


app.put('/user/:id', (req, res) => {

    console.log(req.body, 'updatedata');

    let gID = req.params.id;
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let Password = req.body.Password;
   

    let qr = `update user set fullname='${fullname}',email='${email}',mobile='${mobile}'
               ,'${Password}', where id= ${gID}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        } 
        res.send({
            massege: 'data updated'
        })

    })

})

app.delete('/user/:id',(req,res)=>{
let qID=req.params.id;
let qr=`delete from user where id=${qID}`;
db.query(qr,(err,result)=>{
    if(err){
        console.log(err);
    }
    res.send({
        massege:'data deleted'
    })
})
})
 



app.listen(3000, () => {
    console.log('server is runing...');
})