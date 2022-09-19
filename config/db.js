const mongoose = require('mongoose');

async function dbConnect () {
    try {
        await mongoose.connect(
          process.env.DBURL
        );

        console.log("Databse Connected");
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
}

module.exports = dbConnect;
