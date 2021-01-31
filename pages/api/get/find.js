var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"
import LibApiFind from "../../../libs/LibApiFind"

//
export default async function (req, res){
  try{
// console.log(req.query );
    var content_name = req.query.content
    var site_id = req.query.site_id
// console.log(content_name ,site_id );
    const collection = await LibMongo.get_collection("contents")
    var where ={site_id: site_id,
      name: content_name
    }
    var items = await collection.find(where).sort({created_at: -1}).toArray()  
    items = LibApiFind.convert_items(items) 
// console.log(items);   
    res.json(items);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};