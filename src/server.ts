import express from 'express';
import cors from 'cors';
import routes from './routes';
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { engine } = require('express-handlebars');
import './database/connection';

const app = express();
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "5drsdtrdy66fu8liksdsioi7i87",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main",helpers:{
    math: function(lvalue: string | number, operator: string | number, rvalue: string | number) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    }
}}));

app.set('view engine', 'handlebars');
app.set("views", "./src/views");
console.log(__dirname.replace("/src","") + '/uploads');

app.use('/js',express.static(__dirname + '/public/js'));
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/assets',express.static(__dirname + '/public/assets'));
app.use('/uploads',express.static(__dirname.replace("/src","") + '/uploads'));



app.use(cors());
app.use(express.json());
app.use(routes);

/**app.use(express.static(path.join(__dirname,'public')))
 * app.get('/', function(req,res) {
    //res.send("hello");
    res.sendFile(path.join(__dirname,'public','index.html'))
});**/



app.listen(3333, () => {
    console.log('Server started!');
});