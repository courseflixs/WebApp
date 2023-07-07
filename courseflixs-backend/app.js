require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./connection');
var cors=require('cors');
var categoryRouter = require("./api/routes/adminPanel/categoryRoute");
var getImageRouter=require('./api/routes/getAllImages')
var productRouter=require("./api/routes/adminPanel/productRoute");
var blogRouter=require('./api/routes/adminPanel/blogRoute');
var testimonialRouter=require('./api/routes/adminPanel/testimonialRoute');
var deliveryOrderRouter=require('./api/routes/adminPanel/deliveryRoute');
var userRouter=require('./api/routes/userPanel/endUserRoute')
var subscribedUserRouter=require('./api/routes/userPanel/subscribedUserRouter');
var dashboardRouter=require('./api/routes/adminPanel/dashboardRouter')
var app = express();
//importing database connection
(async () => await connection())();
const corsOptions = {
    origin: '*',            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    secure:false,
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use("/images", express.static(path.join("public/images/products")));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/category', categoryRouter);
app.use('/api/image',getImageRouter);
app.use('/api/product', productRouter);
app.use('/api/blog/',blogRouter);
app.use('/api/testimonial',testimonialRouter);
app.use('/api/delivery',deliveryOrderRouter);
app.use('/api/user',userRouter);
app.use('/api/subscribed',subscribedUserRouter);
app.use('/api/dashboard',dashboardRouter);

app.listen(process.env.PORT | '3000', () => console.log(`App Listning on ${process.env.PORT || '3000'}`))

module.exports = app;
