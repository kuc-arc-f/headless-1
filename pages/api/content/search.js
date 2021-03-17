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
// console.log( data )
    var column_id = data.column_id 
    var site_id = data.site_id 
    var search_key = data.search_key 
    var where = {site_id:  site_id,
      column_id: column_id,
    }
    var limit = {skip: 0 , limit: 500 }
    var items = await LibMongo.get_arrayLimit("contents" , where, limit)      
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