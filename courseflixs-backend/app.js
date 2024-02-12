require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const connection = require('./connection');
// ================================{{Admin Routers}}===========================================
const categoryRouter = require('./api/routes/adminPanel/categoryRoute');
const getImageRouter = require('./api/routes/getAllImages');
const productRouter = require('./api/routes/adminPanel/productRoute');
const blogRouter = require('./api/routes/adminPanel/blogRoute');
const testimonialRouter = require('./api/routes/adminPanel/testimonialRoute');
const deliveryOrderRouter = require('./api/routes/adminPanel/deliveryRoute');
const userRouter = require('./api/routes/userPanel/endUserRoute');
const subscribedUserRouter = require('./api/routes/userPanel/subscribedUserRouter');
const dashboardRouter = require('./api/routes/adminPanel/dashboardRouter');
// ================================{{[END] Of Admin Routers}}===========================================

// ===================================={EndUser Router}===================================================
const endUserProductsRouter = require('./api/routes/userPanel/endUserProductDetailsRoute');
const wishlistRouter = require('./api/routes/userPanel/wishlistRoute');
const requestCourseRouter = require('./api/routes/userPanel/requestCourseRoute');

// ===================================={{[END] Of EndUser Routers}}=======================================

const app = express();
// importing database connection
(async () => await connection())();
const corsOptions = {
  origin: '*', // access-control-allow-credentials:true
  optionSuccessStatus: 200,
  secure: false,
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use('/images', express.static(path.join('public/images/products')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// ================================{{Admin Routers}}===========================================
app.use('/api/category', categoryRouter);
app.use('/api/image', getImageRouter);
app.use('/api/product', productRouter);
app.use('/api/blog/', blogRouter);
app.use('/api/testimonial', testimonialRouter);
app.use('/api/delivery', deliveryOrderRouter);
app.use('/api/user', userRouter);
app.use('/api/subscribed', subscribedUserRouter);
app.use('/api/dashboard', dashboardRouter);
// ================================{{[END] Of Admin Routers}}===========================================

// ===================================={EndUser Router}===================================================
app.use('/api/end-user/products', endUserProductsRouter);
app.use('/api/end-user/wishlist', wishlistRouter);
app.use('/api/end-user/request', requestCourseRouter);
// ===================================={{[END] Of EndUser Routers}}=======================================

app.listen(process.env.PORT | '3000', () => console.log(`App Listning on ${process.env.PORT || '3000'}`));

module.exports = app;
