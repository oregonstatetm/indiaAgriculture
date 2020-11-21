var express = require('express');
var router = express.Router();
var app = express();
var port = process.env.PORT || 3000;
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
//here I will add the mysql pool to work with the tables.
//app.set('mysql',mysql);

app.locals.openOrders = [{
    "orderID" : 55,
    "product" : "Bananas",
    "type" : "Buy",
    "amount" : 14,
    "price" : 4000,
    "status" : "open",
    "date" : "11-1-2020",
    "sellerID" : "",
    "buyerID" : "422"
},
{
    "orderID" : 51,
    "product" : "Wheat",
    "type" : "Sell",
    "amount" : 145,
    "price" : 250,
    "status" : "open",
    "date" : "10-28-2020",
    "sellerID" : "333",
    "buyerID" : ""
},
{
    "orderID" : 50,
    "product" : "Fresh Fruit",
    "type" : "Sell",
    "amount" : 4,
    "price" : 1000,
    "status" : "open",
    "date" : "10-27-2020",
    "sellerID" : "2110",
    "buyerID" : ""
}
]

app.locals.closedOrders = [{
    "orderID" : 1,
    "product" : "Sugar Cane",
    "type" : "Buy",
    "amount" : 6,
    "price" : 7000,
    "status" : "closed",
    "date" : "01-01-2020",
    "sellerID" : "151",
    "buyerID" : "111"
},
{
    "orderID" : 2,
    "product" : "Buffalo Milk",
    "type" : "Sell",
    "amount" : 28,
    "price" : 1000,
    "status" : "closed",
    "date" : "01-01-2020",
    "sellerID" : "100",
    "buyerID" : "57"
},
{
    "orderID" : 3,
    "product" : "Tomaotes",
    "type" : "Buy",
    "amount" : 200,
    "price" : 107,
    "status" : "closed",
    "date" : "01-02-2020",
    "sellerID" : "98",
    "buyerID" : "231"
}
]

app.locals.allOrders =[{
    "orderID" : 55,
    "product" : "Bananas",
    "type" : "Buy",
    "amount" : 14,
    "price" : 4000,
    "status" : "open",
    "date" : "11-1-2020",
    "sellerID" : "",
    "buyerID" : "422"
},
{
    "orderID" : 51,
    "product" : "Wheat",
    "type" : "Sell",
    "amount" : 145,
    "price" : 250,
    "status" : "open",
    "date" : "10-28-2020",
    "sellerID" : "333",
    "buyerID" : ""
},
{
    "orderID" : 50,
    "product" : "Fresh Fruit",
    "type" : "Sell",
    "amount" : 4,
    "price" : 1000,
    "status" : "open",
    "date" : "10-27-2020",
    "sellerID" : "2110",
    "buyerID" : ""
},
{
    "orderID" : 1,
    "product" : "Sugar Cane",
    "type" : "Buy",
    "amount" : 6,
    "price" : 7000,
    "status" : "closed",
    "date" : "01-01-2020",
    "sellerID" : "151",
    "buyerID" : "111"
},
{
    "orderID" : 2,
    "product" : "Buffalo Milk",
    "type" : "Sell",
    "amount" : 28,
    "price" : 1000,
    "status" : "closed",
    "date" : "01-01-2020",
    "sellerID" : "100",
    "buyerID" : "57"
},
{
    "orderID" : 3,
    "product" : "Tomaotes",
    "type" : "Buy",
    "amount" : 200,
    "price" : 107,
    "status" : "closed",
    "date" : "01-02-2020",
    "sellerID" : "98",
    "buyerID" : "231"
}]

app.locals.agTable = [{
    "name": "Sugar Cane",
    "tonnes": 376900000,
    "rank": 2},
{
    "name": "Rice Paddy",
    "tonnes": 172580000,
    "rank": 2},
{
    "name": "Rice Milled",
    "tonnes": 115110860,
    "rank": 2},
{
    "name": "Wheat",
    "tonnes": 99700000,
    "rank": 2},
{
    "name": "Buffalo Milk",
    "tonnes": 91817140,
    "rank": 1},
{
    "name": "Cow Milk",
    "tonnes": 89833590,
    "rank": 2},
{
    "name": "Potatoes",
    "tonnes": 48529000,
    "rank": 2},
{
    "name": "Fresh Vegetables",
    "tonnes": 34430087,
    "rank": 2},
{
    "name": "Bananas",
    "tonnes": 30808000,
    "rank": 1},
{
    "name": "Maize",
    "tonnes": 27820000,
    "rank": 7},
{
    "name": "Dry Onions",
    "tonnes": 22071000,
    "rank": 2},
{
    "name": "Mangoes/Guavas ",
    "tonnes": 21822000,
    "rank": 1},
{
    "name": "Tomatoes",
    "tonnes": 19377000,
    "rank": 2},
{
    "name": "Seed Cotton",
    "tonnes": 14657000,
    "rank": 2},
{
    "name": "Soybeans",
    "tonnes": 13786000,
    "rank": 5},
{
    "name": "Eggplants",
    "tonnes": 12826000,
    "rank": 2},
{
    "name": "Coconuts",
    "tonnes": 11706343,
    "rank": 3},
{
    "name": "Millet",
    "tonnes": 11640000,
    "rank": 1},
{
    "name": "Chick Peas",
    "tonnes": 11380000,
    "rank": 1},
{
    "name": "Fresh Fruit",
    "tonnes": 10043008,
    "rank": 1},
{
    "name": "Tropical Fruit",
    "tonnes": 5916000,
    "rank": 1},
{
    "name": "Pumpkins, Squash and Gourds",
    "tonnes": 5569809,
    "rank": 2},
{
    "name": "Green Peas",
    "tonnes": 5430000,
    "rank": 2},
{
    "name": "Chillies & Peppers Dry",
    "tonnes": 1808011,
    "rank": 1},
{
    "name": "Lentils",
    "tonnes": 1620000,
    "rank": 2},
{
    "name": "Tea",
    "tonnes": 1344827,
    "rank": 2},

];

app.get('/', (req,res) => {
    res.render('home.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/open', (req, res) => {
    res.render('open.ejs')
})

app.get('/closed', (req, res) => {
    res.render('closed.ejs')
})

app.get('/create', (req, res) => {
    res.render('create.ejs')
})

app.get('/index', (req, res) => {
    res.render('index.ejs')
})

app.get('/admin', (req, res) => {
    res.render('admin.ejs')
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

app.listen(port, function() {
    console.log("Server started");
});
