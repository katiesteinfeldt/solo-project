
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const parksRouter = require('./routes/parks.router');
const currentParkRouter = require('./routes/current-park.router');
const myParksRouter = require('./routes/my.parks.router');
const editParkRouter = require('./routes/edit.park.router');
const googleMapsRouter = require('./routes/google.maps.router.js');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/parks', parksRouter);
app.use('/currentpark', currentParkRouter)
app.use('/myparks', myParksRouter);
app.use('/editpark', editParkRouter);
app.use('/googlemaps', googleMapsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
