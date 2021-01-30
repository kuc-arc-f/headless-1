var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"
import LibApiFind from "../../../libs/LibApiFind"

//
export default async function (req, res){
  try{
//console.log(req.query );
    var content_name = req.query.content
//    var site_id = req.query.site_id
    var id = req.query.id
    const collection = await LibMongo.get_collection(content_name)
    var where = { _id: new ObjectID(id) }
    var item = await collection.findOne(where) 
    item = LibApiFind.convertItemOne(item)
//console.log(item);
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
