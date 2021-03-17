import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

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
    var where = { key:  apikey }
    var key = await LibMongo.get_item("apikeys" , where ) 
    if(key == null){ throw new Error('Invalid key , apikeys') }
    var site_id = key.site_id
// console.log( "site_id=", key.site_id )
    var whereColumn = {
      site_id:  site_id, name: content_name,
    }
    var column = await LibMongo.get_item("columns" , whereColumn ) 
    var coluValues = JSON.parse(column.values || '[]')
//console.log( column )
    var newData = LibApiCreate.valid_post(data, coluValues)
    var item = {
      name: content_name,
      column_id: column._id.toString(),
      site_id: site_id,
      values: newData,
      user_id: "",
      created_at: new Date(),
    };
//console.log( item )
    await LibMongo.add_item("contents" ,item )
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
