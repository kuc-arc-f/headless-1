var ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async (req, res) => {
  try{
    var count = await LibMongo.get_count("users" , {} ) 
//console.log(count)
    res.json({count: count})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
