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
    var where = {site_id:  data.site_id}
    var itemOne = await LibMongo.get_item("site_settings" , where ) 
    if(itemOne != null ){
//console.log(itemOne);
      itemOne.webhook_url = webhook_url
      await LibMongo.update_item("site_settings" , where, itemOne )
    }else{
      await LibMongo.add_item("site_settings" ,item )
    }
    res.json([]);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};