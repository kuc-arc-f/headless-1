var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
    var item = data
    var values = JSON.parse(data.colmuns_json || '[]')
    var where = {"_id": new ObjectID( item.id )};
    var itemOne = await LibMongo.get_item("contents" , where ) 
    itemOne.values = values
//console.log(itemOne);
    await LibMongo.update_item("contents" , where, itemOne )
    var url = `/content/list?site_id=${item.site_id}&column=${itemOne.column_id}`
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