const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

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

app.listen(port, function() {
    console.log("Server started");
})