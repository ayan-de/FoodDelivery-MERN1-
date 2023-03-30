const mongoose = require("mongoose");

// const{MongoClient} = require('mongodb');
 const url = 'mongodb+srv://deayan252:12GUDGQ6p0TCeu5u@cluster0.apl2tas.mongodb.net/mernapp?retryWrites=true&w=majority';
//  const client = new MongoClient(url);

 const mongoDBs = async () => {
  await mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
//////////////////////////////////////////////////
    .then(async () => {
      console.log(`connection successful`);
      const fetch_data = await mongoose.connection.db.collection("food_items")
      const response = await fetch_data.find({}).toArray()
      const fetch_data2 = await mongoose.connection.db.collection("food_category")
      const response2 = await fetch_data2.find({}).toArray()
      global.food_items = response;
      global.food_category = response2;
    })
/////////////////////////////////////////////////
    .catch((err) =>
      console.log(`connection unsuccessful and the error is ${err}`)
    );
};


// async function mongoDBs()
// {
//   let result = await client.connect();
//   let db = result.db('mernapp');
//   let collection = db.collection('food_items');
//   let response = await collection.find({}).toArray();
//   console.log(response);
// }

module.exports = mongoDBs;
