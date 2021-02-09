var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
import LibContent from "../../../libs/LibContent"
import LibApiFind from "../../../libs/LibApiFind"
//
export default async function (req, res){
  try{
    var data = req.body
    var token =data._token
//    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
//      throw new Error('Invalid Token, csrf_check');
//    }       
// console.log( data )
    var column_id = data.column_id 
    var site_id = data.site_id 
    var search_key = data.search_key 
    var where = {site_id:  site_id,
      column_id: column_id,
    }
    var collection = await LibMongo.get_collection("contents")
    var items = await collection.find(where, {limit: 500 })
    .sort({created_at: -1}).toArray()
    items = LibContent.getSearchItems(items, search_key ,[] )
//console.log( items )    
    var ret ={
      items: items
    }    
//console.log( ret )
    res.json(ret)
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};