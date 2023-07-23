const mongoose = require("mongoose");

module.exports = async function con() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.PRODUCTION_DB, connectionParams);
    console.log("connected to database.");
  } catch (error) {
    console.log(error, "could not connect to database.");
  }
};