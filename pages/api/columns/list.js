var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//console.log( "site_id=", req.query.site_id )
    var site_id = req.query.site_id 
    var collection = await LibMongo.get_collection("columns" )
    var where = { site_id: site_id }
    var items = await collection.find(where).sort({created_at: -1}).toArray()
    var ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};