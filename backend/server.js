require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnect = require("./db/dbConnect")
const helmet = require('helmet');
const authRoutes=require("./routes/user.route")
const eventRoutes = require('./routes/event.route');
const rsvpRoutes = require('./routes/rsvp.route');
const errorHandler = require('./middleware/errorHandler');


const app = express();

//for body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//for cookie
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/rsvp', rsvpRoutes);

// Error Handler
app.use(errorHandler);



//database connect
dbConnect();

app.listen(process.env.PORT, () => {
    console.log(`server listening on port: ${process.env.PORT}`);

})