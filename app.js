const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layout')

//mongoose
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected,,'))
    .catch((err) => console.log(err));
//EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayout);
//bodyParser
app.use(express.urlencoded({ extended: false }))

//init Nexmo
const nexmo = new Nexmo({
    apiKey: '91a7d126',
    apiSecret: '14Djj96qiGU9nFuV'
}, { debug: true });

//init app
const app = express();

//Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Index route
app.get('/', (req, res) => {
    res.render('index');
});

//catch form submit
app.post('/', (req, res) => {
    //res.send(req.body);
    //console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;
    const from = 'Vonage APIs';

    nexmo.message.sendSms(from, number, text, { type: 'unicode' },
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
                //Get data from response
                const data = {
                    id: responseData.messages[0]['message-id'],
                    number: responseData.messages[0]['to']
                }
                //emit to the client
                io.emit('smsStatus', data)
            }
        }
    )
})

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//Define port
const port = 3000

//Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

//Connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
    console.log('Connected');
    io.on('disconnect', () => {
        console.log('Disconnect');
    })
})


