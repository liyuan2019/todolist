const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri =
  "mongodb+srv://Cluster21779:RkFhaVlYX3dh@cluster21779.rp3tlrn.mongodb.net/test";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // set namespace
    const database = client.db("sample_mflix");
    const coll = database.collection("movies");

    // define pipeline
    const agg = [
      { $search: { autocomplete: { query: "ger", path: "title" } } },
      { $limit: 20 },
      { $project: { _id: 0, title: 1 } },
    ];
    // run pipeline
    const result = await coll.aggregate(agg);

    // print results
    await result.forEach((doc) => console.log(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
