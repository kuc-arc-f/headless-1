var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//console.log(req.body);
    var data = req.body
    var token =data._token
//console.log(data)
      var item = {
        name: data.content_name ,  
        values: data.colmuns_json,
        user_id: "",
        site_id: data.site_id,
        created_at: new Date(),
      };
console.log(item)
    await LibMongo.add_item("columns" ,item ) 
    var url = "/content_type/" + data.site_id
    if (res) {
//      res.writeHead(302, { Location: '/sites' });
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};