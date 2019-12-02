require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var mysql = require('mysql');
var	redis = require('redis');
var session = require('express-session');
var	RedisStore = require('connect-redis')(session);

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var pool  = mysql.createPool({
	connectionLimit : 10,
	host            : 'localhost',
	user            : 'cmol',
	password        : 'Cmol@123',
	database        : 'books'
});

app.use((req, res, next) => {
	res.locals.pool = pool;
	next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var sess = {
	name: "Books",
	store: new RedisStore({
				client: redis.createClient({
				host: process.env.REDIS_HOST,
				port: process.env.REDIS_PORT,
				db: process.env.REDIS_DB
			}),
		db: parseInt(process.env.REDIS_DB),
		ttl: 3600 // 1 hour in seconds	
	}),
	cookie: {
		domain: process.env.SESSION_DOMAIN,
		maxAge: 3600000, // 1 hour in milliseconds
		httpOnly: true
	},
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
};

if (app.get('env') === 'production') {
	sess.cookie.secure = true;
}

app.use(session(sess));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	console.error(err);
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
