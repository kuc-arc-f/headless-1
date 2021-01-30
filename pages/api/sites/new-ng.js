var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();
//import { useRouter } from 'next/router';
//
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//    const router = useRouter();
//console.log(req.body);
    var data = req.body
    var token =data._token
//    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
//      throw new Error('Invalid Token, csrf_check');
//    }    
console.log(data)
      var dat = JSON.parse(data.colmuns_json || '[]')
// console.log( dat.length )
      var item = {
        name: data.content_name ,  
        values: data.colmuns_json,
        user_id: "",
        site_id: data.site_id,
        created_at: new Date(),
      };
console.log(item)
    const collection = await LibMongo.get_collection("columns" )
    await collection.insertOne(item); 
    if (res) {
      res.writeHead(302, { Location: '/sites' });
      res.end();
    }  
    // router.push('/sites');
    /*
    var ret ={
      item: item
    }
    res.json(ret);
    */
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};