var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
// console.log(data);
//    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
//      throw new Error('Invalid Token, csrf_check');
//    }  
    var item = data
//console.log(item);
    const collection = await LibMongo.get_collection("columns")
    var where = {"_id": new ObjectID( item.id )};
    var itemOne = await collection.findOne(where) 
    itemOne.values = item.colmuns_json
// console.log(itemOne);
    await collection.updateOne(where, { $set: itemOne })
    var url = `/content_type/${itemOne.site_id}`
//console.log( "url=",url  )       
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};