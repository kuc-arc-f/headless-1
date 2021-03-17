import Head from 'next/head'
import React from 'react'
import Link from 'next/link';
var ObjectID = require('mongodb').ObjectID;

import LibMongo from "../../../../libs/LibMongo"
import LibApiCreate from "../../../../libs/LibApiCreate"
//
export default async function (req, res){
  try{
    if(typeof req.headers.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
    var content_name = req.query.id
    var apikey = req.headers.apikey
    var data = req.body
    var token =data._token
//console.log( "key=", apikey )
//console.log( "content_name=", content_name )
    if(typeof data.id =='undefined'){
      throw new Error('Invalid , id');
    }
    var id = data.id
//console.log( "id=", id  )
    var where = { key:  apikey }
    var key = await LibMongo.get_item("apikeys" , where ) 
    if(key == null){ throw new Error('Invalid key , apikeys') }
//console.log( "site_id=", key.site_id )
    var where = { "_id": new ObjectID( id ) };
    await LibMongo.delete_item("contents" , where )
//console.log(itemOne); 
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};