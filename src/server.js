const mockdata = require('./mockdata.js');
const bodyParser = require('body-parser')

const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const password = 'test';

app.get('/api', function (req, res) {
	res.send(mockdata.data);
});

app.post('/api', function (req, res){
	console.log('Adding: ', req.body);
	res.send({status: 'success'});
});

app.delete('/api', function(req, res){
	console.log("Deleting: ", req.body);
	res.send({status: 'success'});
});

app.listen(process.env.PORT || 8080, () =>{
	console.log("server started");
});