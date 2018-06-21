const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');

// create express app
const app = express();

// set certificate and key paths
var privateKey = fs.readFileSync(path.join(__dirname, 'src/ssl', 'pandonutrition_com.key'));
var certificate = fs.readFileSync(path.join(__dirname, 'src/ssl', 'pandonutrition_com.crt'));
var ca = fs.readFileSync(path.join(__dirname, 'src/ssl', 'pandonutrition_com.ca-bundle'));

// sets http port - 80 is standard, 8000 is prototyping
var port = process.env.PORT || 80;

// script to parse the certificate bundle

// configures the SSL certificate/key
const options = {
    ca: ca,
    key: privateKey,
    cert: certificate
}

// sets the path for static file serving
app.use(express.static(path.join(__dirname, 'dist')));

// renders the home page upon get request
app.get("/", function(req, res) {
    res.render('dist/index.html');
});
/*
app.use((req, res) => {
    res.writeHead(200);
    res.end();
})
*/

// defines the server
app.listen(port, function() {
    console.log("Listening on " + port);
});

// establishes the https server - 443 is standard, 8080 is prototyping
https.createServer(options, app).listen(443);