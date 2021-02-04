var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//    console.log("id=", req.query.id);
    var id = req.query.id
    const collection = await LibMongo.get_collection("sites" )
    var where = { _id: new ObjectID(id) }
    var item = await collection.findOne(where) 
    //
    const collectionKey = await LibMongo.get_collection("apikeys" )
    var whereKey = { site_id: id }
    var itemKey = await collectionKey.findOne(whereKey)     //           
    var ret ={
      item: item,
      apikey : itemKey,
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};