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
//console.log( "content_name=", content_name )
//console.log( data )
    if(typeof data.id =='undefined'){
      throw new Error('Invalid , id');
    }
    var where = { key:  apikey }
    var key = await LibMongo.get_item("apikeys" , where ) 
    if(key == null){ throw new Error('Invalid key , apikeys') }
//console.log( "site_id=", key.site_id )
    var site_id = key.site_id
    var whereColumn = {
      site_id:  site_id, name: content_name,
    }
    var id = data.id
//console.log( "id=", id  )  
    var column = await LibMongo.get_item("columns" , whereColumn )   
//console.log(column)  
    var coluValues = JSON.parse(column.values || '[]')
    var newData = LibApiCreate.valid_post(data, coluValues)
    var whereContent = { "_id": new ObjectID( id ) };
    var content = await LibMongo.get_item("contents" , whereContent ) 
    content.values = newData
//console.log( content )
    await LibMongo.update_item("contents" , whereContent, content )
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};