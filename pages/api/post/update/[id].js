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
console.log( data )
    var where = { key:  apikey }
    const collectionKeys = await LibMongo.get_collection( "apikeys" )
    var key = await collectionKeys.findOne(where); 
    if(key == null){ throw new Error('Invalid key , apikeys') }
//console.log( "site_id=", key.site_id )
    var site_id = key.site_id
    var whereColumn = {
      site_id:  site_id, name: content_name,
    }
    if(typeof data.id =='undefined'){
      throw new Error('Invalid , id');
    }
    var id = data.id
console.log( "id=", id  )    
    const collection = await LibMongo.get_collection( "columns" )
    var column = await collection.findOne(whereColumn); 
    var coluValues = JSON.parse(column.values || '[]')
    var newData = LibApiCreate.valid_post(data, coluValues)
//console.log( newData )
    var whereContent = { "_id": new ObjectID( id ) };
    const collectionContent = await LibMongo.get_collection( "contents" )
    var content = await collectionContent.findOne(whereContent);
    content.values = newData
console.log( content )
    await collectionContent.updateOne(whereContent, { $set: content })
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};