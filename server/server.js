const express = require("express")
const session = require('express-session')
const http = require("http")
const multer = require('multer')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const { Login, AddEmployee, getAllEmployeee, getEmployeee, Editemployee, deleteEmployeee, checkemailExist} = require('./helpers/userHelper')
const db = require('./connection/connection')


//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        
        cb(null, Date.now() + path.extname(file.originalname))

    }
});
const upload = multer({ storage: storage }).single('image');

app.use(express.static('upload'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({ secret: "key", resave: false, saveUninitialized: false, cookie: { maxAge: 1800000 } }))
db.connect();

// routes
app.post('/login', (req, res) => {
    console.log(req.body);
    Login(req.body).then((response) => {
        res.json( response )
    })
    
})
app.post('/add-employeee', (req, res) => {
    checkemailExist(req.body.email).then((response) => {
        if (response) {
            res.json({ massage: 'email already exist' })
        } else {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    res.send('A Multer error occurred when uploading.');

                } else if (err) {
                    res.send('An unknown error occurred when uploading.');

                    // An unknown error occurred when uploading.
                } else {

                    AddEmployee(req.body, req.file.filename).then(() => {
                        res.json({ status: true })
                    }).catch(() => {
                        res.send('error happend on creating employee!');
                    })


                }
            })
        }
    })
    
    
  
})
app.get('/all-employeees', (req, res) => {
    getAllEmployeee().then((response) => {
        res.json(response)
    })
})
app.post('/get-employeee', (req, res) => {

    getEmployeee(req.body.id).then((response) => {
        
        res.json(response)
    })
})
app.post('/edit-employee', (req, res) => {
    checkemailExist(req.body.email).then((response) => {
        if (response) {
            res.json({ massage: 'email already exist' })
        } else {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    res.send('A Multer error occurred when uploading.');

                } else if (err) {
                    res.send('An unknown error occurred when uploading.');

                    // An unknown error occurred when uploading.
                } else {
                    Editemployee(req.body, req.file.filename).then(() => {
                        res.json({ status: true })
                    }).catch(() => {
                        res.send('error happend on editing employee!');
                  
                  })
                }
            })

        }
    })
   


})
app.get('/delete-employees/:id', (req, res) => {
   
    deleteEmployeee(req.params.id).then(() => {
        
        res.json({status:true})
    })
})

const server = http.createServer(app)

server.listen(5000,()=>{console.log('server started on 5000');})