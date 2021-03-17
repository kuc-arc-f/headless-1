var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
    var id = data.id
//console.log(data);
    var where = { "_id": new ObjectID( id ) };
//console.log(itemOne); 
    await LibMongo.delete_item("contents" , where )   
// var url = `/content/list?site_id=${itemOne.site_id}&column=${itemOne.column_id}`
//console.log(url);
    var ret ={
      id: id
    } 
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};