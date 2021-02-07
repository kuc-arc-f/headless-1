var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
import LibSite from "../../../libs/LibSite"

//
export default async function (req, res){
  try{
    var id = req.query.id
// console.log(id);
    const collection = await LibMongo.get_collection("site_settings" )
//    var where = { _id: new ObjectID(id) }
    var where = { site_id: id }
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