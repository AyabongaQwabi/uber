
            var express = require('express');
            var Exsession = require('express-session')
            var bodyParser = require('body-parser')
            var cookieParser = require('cookie-parser')
            var exphbs  = require('express-handlebars');
            var encrypt = require('bcrypt')
             var mysql = require('mysql');
            var app = express();




            myConnection = require('express-myconnection');
            //database = require('./database');
            var dbOptions = {
                host : "localhost",
                user : "root",
                password : "theaya5379",
                port : 3306,
                database : "Nelisa"

            }


            app.use(myConnection(mysql, dbOptions, 'single'));
            app.use(express.static('public'))
            app.engine('handlebars', exphbs({defaultLayout: 'main'}));
            app.set('view engine', 'handlebars');
            app.use(bodyParser.urlencoded({ extended: false }))
            app.use(bodyParser.json())
            app.use(cookieParser());
            app.use(Exsession({secret:'veryfunnysecret'}));




            app.get('/',function(req,res){
            		console.log(__dirname)
                    res.render('login',{layout:false})

            })

            app.listen(3000)