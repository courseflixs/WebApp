const categorySchema = require('../../models/categorySchema')
const blogSchema = require('../../models/blogSchema');
const orderSchema = require('../../models/deliveredOrderSchema');
const productSchema = require('../../models/productDetailsSchema');
const endUserSchema = require('../../models/endUserSchema');
const subscribeUserSchema = require('../../models/subscribedUserSchema');
const testimonialSchema = require('../../models/testimonialSchema');
const requestCourseSchema=require('../../models/requestCourseSchema')
//############################################################################################//
//<|========================= Dashboard GET method code  ======================|>
//############################################################################################//
exports.retreiveDashboard = async (req, res, next) => {
    //<|========================= Retreiving Count of all Schema  ======================|>
    const dashboardDetails = {};
    
        orderSchema.aggregate([
            {
                $group: {
                    _id: null, // Group by null to aggregate all documents
                    totalSum: { $sum: '$bargain_price' }, // Replace 'fieldName' with the field you want to sum
                    totalCount: { $sum: 1 } // Count the number of documents
                }
            }
        ])
            .exec().then(async(result) => {

                // Access the aggregation result
                if(result){
                const sum = result[0].totalSum;
                const count = result[0].totalCount;
                dashboardDetails.orderPriceSum = sum;
                dashboardDetails.numOfOrder = count;
                }
             
                await productSchema.countDocuments().then((totalPro)=>{dashboardDetails.countOfTotalPro=totalPro})
                await productSchema.countDocuments({show_slider:"Show"}).then((countShow)=>{dashboardDetails.countOfShowSlider=countShow})
                await productSchema.countDocuments({recommended:"Recommended"}).then((countRecommend)=>{dashboardDetails.countOfRecommendPro=countRecommend})
                await blogSchema.countDocuments().then((totalBlog)=>{dashboardDetails.countOfTotalBlog=totalBlog})
                await categorySchema.find().countDocuments().then( (countCat) => { dashboardDetails.countOfCat =  countCat;});
                await endUserSchema.find().countDocuments().then( (countCustomer) => { dashboardDetails.countOfCustomer =  countCustomer;});
                await subscribeUserSchema.find().countDocuments().then( (countSubscriber) => { dashboardDetails.countOfSubscriber =  countSubscriber;});
                await testimonialSchema.find().countDocuments().then( (countTestimonial) => { dashboardDetails.countOfTestimonial =  countTestimonial;});
                await requestCourseSchema.find({status:'0'}).countDocuments().then( (countRequest) => { dashboardDetails.countPendingRequest =  countRequest;});
                await requestCourseSchema.find({status:'1'}).countDocuments().then( (countRequest) => { dashboardDetails.countCompleteRequest =  countRequest;});


                res.status(200).send(dashboardDetails);

            })

    
}

//<|========================= Retreiving Count of all Schema {END}======================|>



