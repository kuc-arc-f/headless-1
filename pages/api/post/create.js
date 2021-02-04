var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
import LibApiCreate from "../../../libs/LibApiCreate"
//
export default async function (req, res){
  try{
    var key = "1234"
//    var site_id = "aa"
    var data = req.body
    var token =data._token
//console.log( data )
    var content_name = data.content_name
    var where = {
      site_id:  data.site_id, name: content_name,
    }
    const collection = await LibMongo.get_collection( "columns" )
    var column = await collection.findOne(where); 
//console.log( column )
    if(column == null){ throw new Error('error, columns is null'); }
    var coluValues = JSON.parse(column.values || '[]')
    var newData = LibApiCreate.valid_post(data, coluValues)
//console.log( newData )
    var item = {
      name: content_name,
      column_id: column._id.toString(),
      site_id: data.site_id,
      values: newData,
      user_id: "",
      created_at: new Date(),
    };
//console.log( item )
    const collectionContent = await LibMongo.get_collection( "contents" )
    await collectionContent.insertOne(item); 
    res.json(item)
//console.log( item )
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};