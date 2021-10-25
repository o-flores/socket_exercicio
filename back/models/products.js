const connection = require('./connection');
const { ObjectID } = require("mongodb");

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
}

const getById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(
    { _id: ObjectID(id) }
  );
  return product;
}

const increaseValue = async(id) => {
  const db = await connection();
  await db.collection('products').updateOne(
    { _id: ObjectID(id) },
    { $inc: { value: 5 } },
  );
}

module.exports = {
  getAll,
  increaseValue,
  getById,
}