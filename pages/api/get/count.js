var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"
import LibApiFind from "../../../libs/LibApiFind"

//
export default async function (req, res){
  try{
//console.log(req.query );
    var content_name = req.query.content
    var site_id = req.query.site_id
    var where ={site_id: site_id}
    const collection = await LibMongo.get_collection(content_name)
    var ret = await collection.find(where).count()  
//console.log(ret);
    res.json({count : ret });
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
