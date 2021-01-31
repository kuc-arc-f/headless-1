var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
    var id = data.id
//console.log(data.content_name);
//    const collection = await LibMongo.get_collection(data.content_name)
    const collection = await LibMongo.get_collection("contents")
    var where = { "_id": new ObjectID( id ) };
    await collection.deleteOne(where)    
    var ret ={
      id: id
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};