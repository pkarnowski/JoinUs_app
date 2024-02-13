var express = require('express');
var mysql = require("mysql2");

var app = express();    //deklarowanie zmiennej dla wtyczki express

app.set("view engine", "ejs");  //służy do połączenia plików ejs(html)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); //odnośnik do folderu public i całej jego zawartości

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'Pablo',
    password : 'linux123!@',
    database : 'Join_us'
});

app.get("/", function(req, res){    // adres strony to http://localhost:5000/, ten "/" na końcu, to endpoint
    var q = "SELECT COUNT(*) AS count FROM users";   //Find the count of users in DB
    connection.query(q, function(error, results){
        if(error) throw error;
        var count = results[0].count;   // zamienia widok kolumny i wiersza na jedną wartość, w tym wypadku suma użytkowników
        //res.send("We have " + count + " users in our DB!");
        res.render("home", {data: count}); //'home' to plik html, .ejs zapisany w folderze views
    });
});

app.post("/register", function(req, res){
    var person = {email: req.body.email};
  connection.query('INSERT INTO users SET ?', person, function (error, results) {
    if (error) throw error;
    res.redirect("/");
  });
});

app.get("/joke", function(req, res){    
    var joke = "What do you call a dog that does magic tricks? A labracadabrador."
    res.send(joke);  
});

app.get("/random_num", function(req, res){
    var num = Math.floor((Math.random() * 10) + 1);    
    res.send("Your lucky number is " + num);
});

app.listen(5000, function(){    //startowanie serwera
    console.log("Server running on 5000!");
});