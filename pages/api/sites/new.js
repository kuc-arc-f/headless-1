var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"
import LibSite from "../../../libs/LibSite"

//
export default async function (req, res){
  try{
//console.log(req.body);
    var data = req.body
    var token =data._token
    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
      throw new Error('Invalid Token, csrf_check');
    }    
    var item = {
      name: data.name ,  
      content: data.content ,
      user_id: "",
      created_at: new Date(),
    };
    const collection = await LibMongo.get_collection("sites" )
    await collection.insertOne(item); 
// console.log("id=", item._id.toString() , typeof(item._id) )
    //
    var key = LibSite.get_apikey()
    var itemKey ={
      site_id: item._id.toString(),
      key: key,
      user_id: "",
      created_at: new Date(),
    }
    const collectionKey = await LibMongo.get_collection("apikeys" )
    await collectionKey.insertOne(itemKey); 
console.log(itemKey)   

    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};