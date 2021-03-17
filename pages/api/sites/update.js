var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
//console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }  
    var id = data.id
    var where = {"_id": new ObjectID( id )};
    var itemOne = await LibMongo.get_item("sites" , where ) 
    itemOne.name = data.name
    itemOne.content = data.content
//console.log(itemOne);
    await LibMongo.update_item("sites" , where, itemOne )
//console.log(id);
    var ret ={
      item: itemOne
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};