const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');


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
})

app.get('/about', (req, res) => {
    res.render('about.ejs')
})

app.listen(port, function() {
    console.log("Server started");
})