var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
// console.log("q=", req.query)
console.log("cname=", req.query.cname )
    var name = req.query.cname
//    var collection = await LibMongo.get_collection(name)
    var collection = await LibMongo.get_collection("contents")
    var where = {site_id:  req.query.site_id ,
      name: name,
    }
    var items = await collection.find(where).sort({created_at: -1}).toArray()
    var ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};