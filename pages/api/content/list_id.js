var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"
import LibPagenate from "../../../libs/LibPagenate"

//
export default async function (req, res){
  try{
// console.log("q=", req.query)
    var id = req.query.id
    var page = req.query.page
    LibPagenate.init();
    var page_info = LibPagenate.get_page_start(page);
// console.log(page_info) 
    var limit = {skip: page_info.start , limit: page_info.limit }
//    var limit = { limit: 500 }
    var collection = await LibMongo.get_collection("contents")
    var where = {site_id:  req.query.site_id ,
      column_id: id,
    }
    var items = await collection.find(where, limit).sort({created_at: -1}).toArray()
    var ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};