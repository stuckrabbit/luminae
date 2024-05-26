import { OrderedProduct } from '@/app/cart/OrderedProduct';
import { Db, MongoClient, ObjectId, WithId } from 'mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  console.log(req.body);
  const products: OrderedProduct[] = await JSON.parse(req.body);
  console.log(products);
  const client : MongoClient = new MongoClient(process.env.MONGODB_URI as string);
  try {
    await client.connect();
    const db : Db = client.db('Products');
    const collection = db.collection('products');
    const results = await Promise.all(products.map(async (product) => {
        console.log(product._id);
        const data = await collection.findOne({_id: new ObjectId(product._id)});
        let index = -1;
        if (data && data.inventoryCount) {
            for (let i = 0; i < data.sizes.length; i++) {
              if (data.sizes[i] === product.size){
                index = i;
                break;
              }
            }
        }
        await collection.updateOne(
          {_id: new ObjectId(product._id)},
          {$set: {[`inventoryCount${index}`]: [data?.inventoryCount[index] - 1]},}
        );

        return data;
      }));
    await results;
    res.status(200).json({"data": results});
    await client.close();
  } catch (error) {
    res.status(500).send(error);
  } finally {
    //
  }
}