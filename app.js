
            var express = require('express');
            var Exsession = require('express-session')
            var bodyParser = require('body-parser')
            var cookieParser = require('cookie-parser')
            var exphbs  = require('express-handlebars');
            var encrypt = require('bcrypt')
             var mysql = require('mysql');
            var app = express();




            myConnection = require('express-myconnection');
            
            var dbOptions = {
                host : "localhost",
                user : "root",
                password : "theaya5379",
                port : 3306,
                database : "uber"

            }


            app.use(myConnection(mysql, dbOptions, 'single'));
            app.use(express.static('public'))
            app.engine('handlebars', exphbs({defaultLayout: 'main'}));
            app.set('view engine', 'handlebars');
            app.use(bodyParser.urlencoded({ extended: false }))
            app.use(bodyParser.json())
            app.use(cookieParser());
            app.use(Exsession({secret:'verysecretsecret'}));




            app.get('/',function(req,res){
            	
                    if(req.session.username){
	                    console.log('Client requests home page')   
	                        var connection = mysql.createConnection(dbOptions)
	                        connection.connect();
	                        connection.query("select * from drivers where username = ?",req.session.username,function(err,results){
                                    res.render('home',{
                                        driverData :results,
                                        username:req.session.username,
                                        userEntryLevel:req.session.userEntryLevel,
                                        usertype:req.session.usertype
                                    });
                                })
	                }                         
	                else{
	                    res.redirect('/login')
	                }

            })



            app.get('/register',function(req,res){
                    res.render('registration',{
                    	layout:false
                    })
            })
            app.post('/register',function(req,res){
                    var connection = mysql.createConnection(dbOptions)
                    console.log("REGISTER -->"+JSON.stringify(req.body))
                    connection.query('select * from drivers',function(err,results){
                        if(err){console.log("ERR : "+err)}
                        if(results.length==0){
                                    var dat={}
                                    dat['username'] = req.body.username
                                    dat['name'] = req.body.username
                                    dat['last_name'] = req.body.username
                                    dat['id_no'] = req.body.username
                                    dat['license_no'] = req.body.username
                                    dat['city'] = req.body.username
                                    dat['vehicle'] = req.body.username
                                    console.log('encrypting..')
                                    var hashed = encrypt.hashSync(req.body.firstpassword,11)
                                    dat['password']= hashed;
                                    dat['entry_level']=1;
                                    console.log("original: "+req.body.firstpassword+" HASH:"+hashed)
                                    connection.query('insert into users set ?',dat,function(err,results){
                                            console.log("ERR : "+err)
                                            res.redirect('/login')
                                    })
                                    console.log('Done encrypting')
                        }
                        else{
                                var nameExist =false;
                                results.forEach(function(result){
                                    if(result.username.toLowerCase()==req.body.username.toLowerCase())
                                    {
                                        console.log(JSON.stringify(result))
                                        nameExist=!nameExist
                                        res.sendfile('public/redirect.html')
                                        
                                    }

                                })
                                if(!nameExist){
                                    var dat={}
                                    dat['username'] = req.body.username
                                    console.log('encrypting..')
                                    var hashed = encrypt.hashSync(req.body.firstpassword,11)
                                    dat['password']= hashed;
                                    console.log("original: "+req.body.firstpassword+" HASH:"+hashed)
                                    connection.query('insert into users set ?',dat,function(err,results){
                                            console.log("ERR : "+err)
                                            res.redirect('/login')
                                    })
                                    console.log('Done encrypting')
                                }
                            }
                        
                    })
                    
                    
            })
            app.get('/login',function(req,res){
                    res.render('login', {layout: false})
            });

           app.post('/login',function(req,res){
                    
                   var connection = mysql.createConnection(dbOptions)
                    connection.query('select * from drivers',function(err,results){
                        console.log("ERR : "+err)
                        var Found=false;
                        console.log("\n\nRESULTS:"+results);
                        console.log("LENGTH :"+results.length+'\n\n')
                        results.forEach(function(result){                             
                           
                            var hashedPassword =result.password;
                            var clientPassword =req.body.password;

                            var correctPassword = encrypt.compareSync(clientPassword,hashedPassword)
                            
                            if(result.username==req.body.name && correctPassword)
                            {                               
                                Found=!Found;
                                req.session.userEntryLevel = result.entry_level
                                var usertype ='';
                                if(req.session.userEntryLevel==1){
                                    usertype='admin'
                                }
                                else{
                                    usertype='viewer'
                                }
                                req.session.usertype=usertype;

                            }

                        })
                        if(Found){
                            
                                req.session.username = req.body.name                            
                                connection.query("select * from drivers where username = ?",req.session.username,function(err,results){
                                    res.render('home',{
                                        driverData :results,
                                        username:req.session.username,
                                        userEntryLevel:req.session.userEntryLevel,
                                        usertype:req.session.usertype
                                    });
                                })   
                          
                             
                             
                        }else{
                            res.render('login', {layout: false,correct:Found})
                           
                        }
                        
                    
                })
            })
            app.listen(3000)