const bodyParser = require('body-parser');
const express = require('express');
const db = require('./configs/database');
const port = 8095;


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(express.json());

app.use('/',require('./routers/index'));

app.listen(port, (error) => {
    if (!error) {
        console.log("Sever Start..");
        console.log("http://localhost:" + port);
        db();
    }
})
