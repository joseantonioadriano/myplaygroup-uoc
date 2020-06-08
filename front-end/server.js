const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/myplaygroup-front-angular'));

app.get('/*', function (req,res) {
	res.sendFile(path.join(__dirname + '/dist/myplaygroup-front-angular/index.html'));	
})

app.listen(process.env.PORT || 8080);

console.log('Console listening!');
