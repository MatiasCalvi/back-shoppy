const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
let connection = async () => {
  try {
    mongoose.connect(process.env.LINK_DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("good news!, connected to database");
  } catch (error) {
    console.log(error.message);
  }
};
connection();
