var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
// console.log(data);
    var item = data
//console.log(item);
    var where = {"_id": new ObjectID( item.id )};
    var itemOne = await LibMongo.get_item("columns" , where ) 
    itemOne.values = item.colmuns_json
// console.log(itemOne);
    await LibMongo.update_item("columns" , where, itemOne )
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