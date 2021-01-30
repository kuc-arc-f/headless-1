var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
    var token =data._token
//    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
//      throw new Error('Invalid Token, csrf_check');
//    }    
//console.log( data )
    var cole_name = data.content_name
    var values = JSON.parse(data.colmuns_json || '[]')
    var item = {
      column_id: data.column_id,
      site_id: data.site_id,
//      values: data.colmuns_json,
      values: values,
      user_id: "",
      created_at: new Date(),
    };    
//console.log( item )
    const collection = await LibMongo.get_collection( cole_name )
    await collection.insertOne(item); 
    var url = `/content/show?id=${item.column_id}&site_id=${item.site_id}`
    console.log( "url=",url  )
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};