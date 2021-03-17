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
    var where = { site_id: id }
    var item = await LibMongo.get_item("site_settings" , where ) 
//console.log(item);
    where = { _id: new ObjectID(id) }
    var site = await LibMongo.get_item("sites" , where ) 
// console.log(site);
    var ret ={
      item: item, site : site
    }    
    res.json(ret);    
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};