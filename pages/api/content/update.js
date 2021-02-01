var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
//    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
//      throw new Error('Invalid Token, csrf_check');
//    }  
    var item = data
    var values = JSON.parse(data.colmuns_json || '[]')
    const collection = await LibMongo.get_collection("contents")
    var where = {"_id": new ObjectID( item.id )};
    var itemOne = await collection.findOne(where) 
    itemOne.values = values
//console.log(itemOne);
    await collection.updateOne(where, { $set: itemOne })
    var url = `/content/list?site_id=${item.site_id}&column=${itemOne.column_id}`
//    var url = `/content/show?id=${itemOne.column_id}&site_id=${item.site_id}`
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