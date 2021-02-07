var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
import LibSite from "../../../libs/LibSite"

//
export default async function (req, res){
  try{
    var data = req.body
// console.log(data);
    var webhook_url =  data.url
    var item = {
      webhook_url: webhook_url, 
      site_id : data.site_id, 
      user_id: "",
      created_at: new Date(),
    };    
    const collection = await LibMongo.get_collection("site_settings" )
    var where = {site_id:  data.site_id}
    var itemOne = await collection.findOne(where); 
    if(itemOne != null ){
console.log(itemOne);
      itemOne.webhook_url = webhook_url
      await collection.updateOne(where, { $set: itemOne })
    }else{
      await collection.insertOne(item); 
    }
    res.json([]);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};