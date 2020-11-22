var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('port', process.argv[2]);

//here I will add the mysql pool to work with the tables.
app.set('mysql',mysql);

// Local Variables Passed to All Routes and used in SELECT queries
app.locals.agTable=[];
app.locals.openOrders = [];
app.locals.closedOrders = [];
app.locals.allOrders = [];
app.locals.buyers = [];
app.locals.sellers = [];


app.get('/', (req,res) => {
    var callbackCount = 0;
    res.render('home');

    /*getAgriculturalProducts(res, complete);

    function complete(){
        callbackCount++;
        if(callbackCount >=1){
            res.render('home');
        }

    }
    */
});

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/open', (req, res) => {
    var callbackCount = 0;

    getOpenOrders(res, complete);

    function complete(){
        callbackCount++;
        if(callbackCount >=1){
            res.render('open');
        }
    }
});

app.get('/closed', (req, res) => {
    var callbackCount = 0;

    getClosedOrders(res, complete);

    function complete(){
        callbackCount++;
        if(callbackCount >=1){
            res.render('closed');
        }
    }
})

app.get('/create', (req, res) => {
    res.render('create.ejs')
})

app.get('/index', (req, res) => {
    res.render('index.ejs')
})

app.get('/admin', (req, res) => {
    var callbackCount = 0;

    getBuyers(res, complete);
    getSellers(res, complete);
    getOrders(res,complete);

    function complete(){
        callbackCount++;
        if(callbackCount >=3){
            res.render('admin');
        }
    }
});

app.get('/about', (req, res) => {
    res.render('about.ejs')
});

app.post('/',function(req,res){
	if(req.body.registerType == "Buyer"){
		sql = "INSERT INTO Buyers (Name,Email) VALUES (?,?)";
	}
	else if(req.body.registerType == "Seller"){
		sql = "INSERT INTO Sellers (Name,Email) VALUES (?,?)";
	}
	mysql.pool.query(sql,[req.body.inputName,req.body.inputEmail],function(error,results,fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		else{
			res.redirect('/register');
		}
	});
});

//Get Agricultural Products to populate the table on /home
function getAgriculturalProducts(res, complete){
    sql="SELECT Name, Tons_Produced, World_Ranking, Wholesale_Price FROM Agricultural_Products";
    mysql.pool.query(sql, function (error,results,fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        app.locals.agTable=results;
        //console.log("ROWDATAPACKET");
        //console.log(results[0].Name);
        complete();

    })
};

//Get Buyers to populate the table on /admin
function getBuyers(res, complete){
    sql="SELECT ID, Name, Email FROM Buyers";
    mysql.pool.query(sql, function (error,results,fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        app.locals.buyers=results;
        complete();

    });
}

//Get Sellers to populate the table on /admin
function getSellers(res, complete){
    sql="SELECT ID, Name, Email FROM Sellers";
    mysql.pool.query(sql, function (error,results,fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        app.locals.sellers=results;
        complete();

    });
}

//Get Orders to populate the table on /Admin
function getOrders(res, complete){
    sql="SELECT Order_ID, Product_ID, OrderType, Amount, Price, Status, OrderDate, Seller_ID, Buyer_ID FROM Orders";
    mysql.pool.query(sql, function (error,results,fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        app.locals.allOrders=results;
        complete();

    });
}

//Get Open Orders to populate the table on /OpenOrders
function getOpenOrders(res, complete){
    sql="SELECT Order_ID, Product_ID, OrderType, Amount, Price, Status, OrderDate, Seller_ID, Buyer_ID FROM Orders WHERE OrderType = 'Buy'";
    mysql.pool.query(sql, function (error,results,fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        app.locals.openOrders=results;
        complete();

    });
}

//Get Closed Orders to populate the table on /OpenOrders
function getClosedOrders(res, complete){
    sql="SELECT Order_ID, Product_ID, OrderType, Amount, Price, Status, OrderDate, Seller_ID, Buyer_ID FROM Orders WHERE OrderType = 'Sell'";
    mysql.pool.query(sql, function (error,results,fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        app.locals.closedOrders=results;
        complete();

    });
}

function getDetails(res,Name,context){
	sql = "SELECT Product_ID , Wholesale_Price FROM Agricultural_Products WHERE Name = ?";
	mysql.pool.query(sql,[Name],function(error,result,fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context = JSON.parse(JSON.stringify(result));
		console.log(context); //Data saved as context[0].Product_ID and context[0].Wholesale_Price 
		//How to send this data back to the function where we need to add.
	});
}
function getID(res,table,Name,context){
	var ID_N = 0
	if (table == "Seller"){
		sql = "SELECT ID FROM Sellers WHERE Name = ?";
	}
	else{
		sql = "SELECT ID FROM Buyers WHERE Name = ?";
	}	
	mysql.pool.query(sql,[Name],function(error,results,fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		console.log("getting ID");
		context = JSON.parse(JSON.stringify(results));
		console.log(context); 	//Here is the data , the ID we got back from the buyers and Sellers table. saved the value as context[0].ID
	});
}

app.post('/create_order',function(req,res){
	var context = {}
	var Type = ""
	if(req.body.OrderType == "Buyer"){
		sql = "INSERT INTO Orders (Product_ID, OrderType,Amount,Price,Buyer_ID) VALUES (?,?,?,?,?)";
		con = getID(res,"Buyer",req.body.UserName,context);
		Type = "Buy";
	}	
	else{
		sql = "INSERT INTO Orders (Product_ID, OrderType,Amount,Price,Seller_ID) VALUES (?,?,?,?,?)";
		con = getID(res,"Seller",req.body.UserName);
		Type = "Sell"
	}
	getDetails(res,req.body.agriculturalProduct);	
	mysql.pool.query(sql,[("Adding the variable of ID we get back"), Type, req.body.OrderAmount,("Adding the variable of Price we get backA"),("Adding the Seller/Buyer-ID got back")],function(error,results,fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		else{
			res.redirect('/create');
		}
	
	});
});

app.use(function(req,res){
	res.status(404);
	res.render('404.ejs');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500.ejs');
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
