
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
            	    console.log("\n\n----------------------------get /---------------------------------")
                    if(req.session.username){
	                    console.log('Client requests / page')   
	                        var connection = mysql.createConnection(dbOptions)
	                        connection.connect();
	                        connection.query("select * from driver where username = ?",req.session.username,function(err,results){
                                    res.render('home',{
                                    	layout:false,
                                        driverData :results,
                                        username:req.session.username,
                                        userEntryLevel:req.session.userEntryLevel,
                                        usertype:req.session.usertype
                                    });
                                })
	                }                         
	                else{
	                    res.redirect('/landing')
	                }

            })
			app.get('/landing',function(req,res){
					res.render('landingPage',{layout:false})
			})








			app.get('/agentlogin',function(req,res){
					res.render('agentlogin',{layout:false})
			})
			app.post('/agentlogin',function(req,res){
				 console.log("\n\n----------------------------POST /agentlogin---------------------------------")
                    console.log('Client posts to agent login')
                   var connection = mysql.createConnection(dbOptions)
                    connection.query('select * from agent',function(err,results){
                        console.log("ERR : "+err)
                        var Found=false;
                        console.log("RESULTS:"+results);
                        console.log("LENGTH :"+results.length+'\n')
                        results.forEach(function(result){                             
                           
                            var hashedPassword =result.password;
                            var clientPassword =req.body.password;

                            var correctPassword = (hashedPassword == clientPassword)
                            console.log('PAssword match:'+correctPassword)

                            if(result.username==req.body.username && correctPassword)
                            {     console.log('username found')                          
                                Found=!Found;
                                 /*req.session.userEntryLevel = result.entry_level
                               var usertype ='';
                                if(req.session.userEntryLevel==1){
                                    usertype='admin'
                                }
                                else{
                                    usertype='viewer'
                                }
                                req.session.usertype=usertype;*/

                            }

                        })
                        if(Found){
                            	console.log('Agent found')
                                req.session.username = req.body.username                            
                                connection.query("select * from agent where username = ?",req.session.username,function(err,agents){
                                   
                                    var agentinfo =agents[0]
	                        		connection.query('select * from issues ',function(err,issues){
										issues.forEach(function(result){
												if(result.status==1){
													result['status']=true;
												}
												else{
													result['status']=false;
												}
											})
										if(err){console.log('ERR issues for agents:'+err)}
										var issues=issues	
										console.log('ISSUES :'+JSON.stringify(issues))	
										connection.query('select * from driver ',function(err,drivers){
											connection.query('select * from question ',function(err,results){
											

											if(err){console.log('ERR Driver docs:'+err)}
											console.log('DOCS:'+JSON.stringify(results))	
											res.render('agent',{
												issues:issues,
												drivers:drivers,
												Questions:results,
		                                    	layout:false,
		                                        driverData :agentinfo,
		                                        username:req.session.username,
		                                        userEntryLevel:req.session.userEntryLevel,
		                                        usertype:req.session.usertype
		                                    });

											console.log("QS:"+JSON.stringify(results))
										})
									})
                                    
                                })
							})
                                    
                                   
                          
                             
                             
                        }else{
                        	console.log('Agent not found')
                            res.render('login', {layout: false,correct:Found})
                           
                        }
                        
                    
                })		
			})
			app.get('/home',function(req,res){
					console.log("\n\n----------------------------get /home---------------------------------")
            	    console.log('SESSION:'+JSON.stringify(req.session))
                    if(req.session.username){
	                    console.log('Client requests /home page')   
	                        var connection = mysql.createConnection(dbOptions)
	                        connection.connect();
	                        connection.query("select * from driver where username = ?",req.session.username,function(err,results){
                                    var id = results[0].id
                                    var driverinfo =results[0]
	                        		connection.query("SELECT driver.name,issues.issue,issues.status, documents.type,documents.url FROM driver,issues,documents WHERE issues.driver_id = ? AND documents.driver_id = ?;",[id,id],function(err,results){
										if(err){console.log('ERR Driver issues:'+err)}
										console.log('ISSUES & DOCS:'+JSON.stringify(results))	
										res.render('home',{
	                                    	layout:false,
	                                        driverData :driverinfo,
	                                        username:req.session.username,
	                                        userEntryLevel:req.session.userEntryLevel,
	                                        usertype:req.session.usertype
	                                    });



									})
                                    
                                })
	                }                         
	                else{
	                    res.redirect('/login')
	                }
	                console.log("----------------------------END /home---------------------------------")
            })




			app.get('/logout',function(req,res){
                req.session.destroy(function(){
                        res.redirect('/login')
                })
            })
            app.get('/register',function(req,res){
            	    console.log("\n\n----------------------------get /register---------------------------------")
                    res.render('registration',{
                    	layout:false
                    })
            })
            app.post('/register',function(req,res){
            	console.log("\n\n----------------------------POST /register---------------------------------")
            	    console.log('USER POSTED ON REGSSS')
                    var connection = mysql.createConnection(dbOptions)
                    console.log("REGISTER -->"+JSON.stringify(req.body))
                    connection.query('select * from driver',function(err,results){
                        if(err){console.log("ERR : "+err)}
                        if(results.length==0){
                                    var dat={}
                                    dat['username'] = req.body.username
                                    dat['name'] = req.body.name
                                    dat['email_address'] =req.body.email
                                    dat['last_name'] = req.body.surname
                                    dat['id_number'] = req.body.id_no
                                    dat['license_number'] = req.body.licence
                                    dat['city'] = req.body.city
                                    dat['vehicle'] = req.body.vehicle
                                    console.log('encrypting..')
                                    var hashed = encrypt.hashSync(req.body.password_confirm,11)
                                    dat['password']= hashed;
                                  
                                    console.log("original: "+req.body.firstpassword+" HASH:"+hashed)
                                    connection.query('insert into driver set ?',dat,function(err,results){
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
                                    	console.log('username exists')
                                        console.log(JSON.stringify(result))
                                        nameExist=!nameExist
                                        res.sendfile('public/redirect.html')
                                        
                                    }

                                })
                                if(!nameExist){
                                    var dat={}
                                    dat['username'] = req.body.username
                                    dat['name'] = req.body.name
                                    dat['email_address'] =req.body.email
                                    dat['last_name'] = req.body.surname
                                    dat['id_number'] = req.body.id_no
                                    dat['license_number'] = req.body.licence
                                    dat['city'] = req.body.city
                                    dat['vehicle'] = req.body.vehicle
                                    console.log('encrypting..')
                                    var hashed = encrypt.hashSync(req.body.password_confirm,11)
                                    dat['password']= hashed;
                                  
                                    console.log("original: "+req.body.firstpassword+" HASH:"+hashed)
                                    connection.query('insert into driver set ?',dat,function(err,results){
                                            console.log("ERR : "+err)
                                            res.render('login', {layout: false})
                                    })
                                    console.log('Done encrypting')
                                }
                            }
                        
                    })
                    
                    
            })
            app.get('/login',function(req,res){
            	console.log("\n\n----------------------------get /login---------------------------------")
                    res.render('login', {layout: false})
            });
           app.post('/driver/issue/post',function(req,res){
           			if(req.session.username){
           				console.log(JSON.stringify(req.body))
           				console.log('adding issue '+req.body.issue_name)
           				var data =req.body;
	           			var connection =mysql.createConnection(dbOptions)
	           			connection.connect();
	           			connection.query("select * from driver where username = ?",req.session.username,function(err,results){
	                           if(err){console.log(err)}
	                           data['driver_id'] = results[0].id
	                           connection.query('insert into issues set ?',data,function(err,results){
	                           		 if(err){console.log(err)}
	                           		 	res.send('done')
	           					})
	                    })

           			}
           			else{
           				console.log('cant post without active session')
           				res.render('login', {layout: false})}
           			
           			
           })
		   app.get('/drivers/documents/:id',function(req,res){
		   		var id = req.params.id.substring(1);
		   		var connection =mysql.createConnection(dbOptions)
	           	connection.connect();
		   		connection.query('select * from documents where driver_id = ?',id,function(err,results){
							
							if(err){console.log('ERR Driver docs:'+err)}
							res.send(results);
				})


		   })
		    app.get('/drivers/issues/:id',function(req,res){
		   		var id = req.params.id.substring(1);
		   		var connection =mysql.createConnection(dbOptions)
	           	connection.connect();
		   		connection.query('select * from issues where driver_id = ?',id,function(err,results){
							
							if(err){console.log('ERR Driver issues:'+err)}
							res.send(results);
				})


		   })

           app.post('/login',function(req,res){
           	 console.log("\n\n----------------------------POST /login---------------------------------")
                    console.log('Client posts to login')
                   var connection = mysql.createConnection(dbOptions)
                    connection.query('select * from driver',function(err,results){
                        console.log("ERR : "+err)
                        var Found=false;
                        console.log("RESULTS:"+results);
                        console.log("LENGTH :"+results.length+'\n')
                        results.forEach(function(result){                             
                           
                            var hashedPassword =result.password;
                            var clientPassword =req.body.password;

                            var correctPassword = encrypt.compareSync(clientPassword,hashedPassword)
                            console.log('PAssword match:'+correctPassword)

                            if(result.username==req.body.username && correctPassword)
                            {     console.log('username found')                          
                                Found=!Found;
                                 /*req.session.userEntryLevel = result.entry_level
                               var usertype ='';
                                if(req.session.userEntryLevel==1){
                                    usertype='admin'
                                }
                                else{
                                    usertype='viewer'
                                }
                                req.session.usertype=usertype;*/

                            }

                        })
                        if(Found){
                            	console.log('Driver found')
                                req.session.username = req.body.username                            
                                connection.query("select * from driver where username = ?",req.session.username,function(err,drivers){
                                    var id = drivers[0].id
                                    var driverinfo =drivers[0]
	                        		connection.query('select * from issues where driver_id = ?',id,function(err,issues){
										issues.forEach(function(result){
												if(result.status==1){
													result['status']=true;
												}
												else{
													result['status']=false;
												}
											})
										if(err){console.log('ERR Driver issues:'+err)}
										var issues=issues	
										console.log('ISSUES :'+JSON.stringify(issues))	
										connection.query('select * from documents where driver_id = ?',id,function(err,results){
											

											if(err){console.log('ERR Driver docs:'+err)}
											console.log('DOCS:'+JSON.stringify(results))	
											res.render('home',{
												issues:issues,
												docs:results,
		                                    	layout:false,
		                                        driverData :driverinfo,
		                                        username:req.session.username,
		                                        userEntryLevel:req.session.userEntryLevel,
		                                        usertype:req.session.usertype
		                                    });
										})
									})
                                    console.log('DRIVER DATA:'+JSON.stringify(driverinfo))
                                })
                                    
                                   
                          
                             
                             
                        }else{
                        	console.log('Driver not found')
                            res.render('login', {layout: false,correct:Found})
                           
                        }
                        
                    
                })
            })
            app.listen(3000)