var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

//here I will add the mysql pool to work with the tables.
app.set('mysql',mysql);

// Local Variables Passed to All Routes and used in SELECT queries
app.locals.agTable= [] ;
app.locals.openOrders = [];
app.locals.closedOrders = [];
app.locals.allOrders = [];
app.locals.buyers = [];
app.locals.sellers = [];
app.locals.ag_s = [];
app.locals.id = [];
app.locals.singleOrder = [];

app.get('/', (req,res) => {
    var callbackCount = 0;

    getAgriculturalProducts(res, complete);

    function complete(){
        callbackCount++;
        if(callbackCount >=1){
            res.render('home.ejs');
        }

    }
    
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

app.get('/update/:id', (req, res) => {
    orderID = req.params.id;
    var callbackCount = 0;

    getSingleOrder(res,orderID,complete);
    getAgriculturalProducts(res, complete);

    function complete(){
        callbackCount++;
        if(callbackCount >=2){
            res.render('update.ejs');
        }
    }
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
sql="SELECT Order_ID, Product_ID, OrderType, Amount, Price, Status, OrderDate, Seller_ID, Buyer_ID FROM Orders";

app.post('/update/:id', function (req,res){
    orderID = req.params.id;
    var sql = "UPDATE Orders SET Product_ID = ?, OrderType = ?, Amount = ?, Price = ?, Status = 0, OrderDate = ?, Seller_ID = ?, Buyer_ID = ? WHERE Order_ID = ?";
    var inserts = [req.body.updateAgriculturalProduct_ID, req.body.updateOrderType, req.body.updateAmount, req.body.updatePrice, req.body.updateDate, req.body.updateSeller_ID, req.body.updateBuyer_ID,orderID];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            res.end();
        }
        res.render('admin');
    });
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

function getSingleOrder(res,id,complete){
    sql="SELECT Order_ID, Product_ID, OrderType, Amount, Price, Status, OrderDate, Seller_ID, Buyer_ID FROM Orders WHERE Order_ID = ?"
    var inserts = [id];
    console.log("Order ID: ");
    console.log(id);

    mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        console.log(results);
        app.locals.singleOrder = results;
        complete();
    })

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

function getDetails(res,Name,context,complete){
	sql = "SELECT Product_ID , Wholesale_Price FROM Agricultural_Products WHERE Name = ?";
	mysql.pool.query(sql,[Name],function(error,results,fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context = JSON.parse(JSON.stringify(results));
		app.locals.ag_s = context;
		complete();
	});
}
function getID(res,table,Name,context,complete){
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
		context = JSON.parse(JSON.stringify(results));
		app.locals.id = context;
		complete();
	});
}

app.post('/create_order',function(req,res){
	var context = {};
	var Type = "";
	var callCount = 0;
	if(req.body.OrderType == "Buyer"){
		f_sql = "INSERT INTO Orders (Product_ID, OrderType,Amount,Price,OrderDate,Buyer_ID) VALUES (?,?,?,?,?,?)";
		getID(res,"Buyer",req.body.UserName,context,complete);
		Type = "Buy";
	}	
	else{
		f_sql = "INSERT INTO Orders (Product_ID, OrderType,Amount,Price,OrderDate,Seller_ID) VALUES (?,?,?,?,?,?)";
		getID(res,"Seller",req.body.UserName,context,complete);
		Type = "Sell";
	}
	getDetails(res,req.body.agriculturalProduct,context,complete);
	
	function complete(){
		callCount++;
		if(callCount >= 2){
			if(app.locals.ag_s[0].Wholesale_Price == null){
				app.locals.ag_s[0].Wholesale.Price = 0;
			}
			mysql.pool.query(f_sql,[app.locals.ag_s[0].Product_ID,Type,req.body.OrderAmount,app.locals.ag_s[0].Wholesale_Price,req.body.date,app.locals.id[0].ID],function(error,results,fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				}
				else{
					res.redirect('/create');
				}
			});
		}
	}	
	
});

app.post('/add_product',function(req,res){
	sql = "INSERT INTO Agricultural_Products (Name,Tons_Produced,World_Ranking,Wholesale_Price) VALUES (?,?,?,?)";
	mysql.pool.query(sql,[req.body.ProductName,req.body.TonsProduce,req.body.WorldsRanking,req.body.Amount],function(error,results,fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end()
		}
		else{
			res.redirect('/admin');
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

app.listen(port, () => {
    console.log(`Our app is running on port ${ port }`);
});
