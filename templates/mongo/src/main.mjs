import { MongoClient } from "mongodb";

const URI = "mongodb://admin:secret@localhost:27017";

const client = new MongoClient(URI);

async function main() {
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db("test-db");
  const collection = db.collection("test-collection");

  //   await collection.dropIndex("createdAt_index");

  //   await collection.createIndex({ createdAt: -1 }, { name: "createdAt_index" });

  // const indexes = await collection.indexes();
  // console.dir({ indexes }, { depth: null });

  console.time("fetch");
  const day = new Date("2025-11-01");
  const startTime = new Date(day.setUTCHours(0, 0, 0, 0));
  const days = 2;
  const endTime = new Date(startTime);
  endTime.setUTCDate(endTime.getUTCDate() + days);
  console.log({ startTime, endTime });
  const aggrateCursor = collection.aggregate([
    {
      $match: {
        "s=SP1_FIT_01_MAE_TM": { $exists: true },
        createdAt: { $gte: startTime, $lt: endTime },
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        min: { $min: "$s=SP1_FIT_01_MAE_TM" },
        max: { $max: "$s=SP1_FIT_01_MAE_TM" },
        sum: { $sum: "$s=SP1_FIT_01_MAE_TM" },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  const [{ _id, ...docs }] = await aggrateCursor.toArray();
  console.timeEnd("fetch");
  console.log({ docs });
}

main()
  .catch(console.error)
  .finally(() => client.close());
