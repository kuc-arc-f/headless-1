var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"
import LibApiFind from "../../../libs/LibApiFind"

//
export default async function (req, res){
  try{
//console.log(req.query );
    var content_name = req.query.content
    var site_id = req.query.site_id
// console.log(content_name ,site_id );
    const collection = await LibMongo.get_collection("contents")
    var items = []
    var where ={site_id: site_id,
      name: content_name
    }
    if(( typeof req.query.skip !='undefined') &&
      ( typeof req.query.limit !='undefined')){
//console.log("skip=", req.query.skip, req.query.limit );
      var limit = {skip: parseInt(req.query.skip) , limit: parseInt(req.query.limit) }
      items = await collection.find(where, limit).sort({created_at: -1}).toArray()  
    }else{
      items = await collection.find(where).sort({created_at: -1}).toArray()  
    }
    items = LibApiFind.convert_items(items) 
//console.log(items.length);   
    res.json(items);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};