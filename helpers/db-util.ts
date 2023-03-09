import { MongoClient, Document } from "mongodb";

export const connectDataBase = async () =>
  await MongoClient.connect(
    "mongodb+srv://Kam:DKkX7pyEcCG21lXU@cluster0.9evg0gt.mongodb.net/events?retryWrites=true&w=majority"
  );

export const insertDocument = async <T extends Document>(
  client: MongoClient,
  collection: string,
  body: T
) => {
  const db = client.db();
  return await db.collection(collection).insertOne(body);
};

export const getAllDocuments = async <T extends Document>(
  client: MongoClient,
  collection: string,
  sort: T,
  filter = {}
) => {
  const db = client.db();

  return await db.collection(collection).find(filter).sort(sort).toArray();
};
