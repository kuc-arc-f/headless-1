var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//console.log("apiShow.query=", req.query);
    var id = req.query.id
//    var colle_name = req.query.content_name + "_"+ req.query.site_id
    const collection = await LibMongo.get_collection(req.query.content_name)
    var where = { _id: new ObjectID(id) }
    var item = await collection.findOne(where)            
    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};