var ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async (req, res) => {
  try{
//    var retArr= {ret:0, user_id:0}
//    var data = req.body
    const collection = await LibMongo.get_collection("users" )
    var count = await collection.count()  
//console.log(count)
    res.json({count: count})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
