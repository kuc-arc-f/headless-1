var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"
import LibApiFind from "../../../libs/LibApiFind"
import LibPagenate from "../../../libs/LibPagenate"
//
export default async function (req, res){
  try{
//console.log(req.query );
    var content_name = req.query.content
    var site_id = req.query.site_id
// console.log(content_name ,site_id );
    var items = []
    var where ={site_id: site_id,
      name: content_name
    }
    // order
    if(typeof req.query.order !='undefined'){
//console.log(req.query.order)
      var order = req.query.order
      const orderArr = order.split(':');
      if(orderArr.length < 2){ throw new Error('error, orderArr.length'); }
      var order_col = orderArr[0]
      var order_asc = orderArr[1]
      items = await LibMongo.get_arrayWhere("contents" , where)
      items = LibApiFind.convert_items(items) 
      items = LibApiFind.get_order_items(items, order_col, order_asc)
      if(( typeof req.query.skip !='undefined') &&
      ( typeof req.query.limit !='undefined')){
        var skip = req.query.skip
        var limit = req.query.limit
        items = LibPagenate.get_items(items, skip, limit)
      }
//console.log(items)
    }else{
      if(( typeof req.query.skip !='undefined') &&
      ( typeof req.query.limit !='undefined')){
//console.log("skip=", req.query.skip, req.query.limit );
        var limit = {skip: parseInt(req.query.skip) , limit: parseInt(req.query.limit) }
        items = await LibMongo.get_arrayLimit("contents" , where, limit)  
      }else{
        items = await LibMongo.get_arrayWhere("contents" , where) 
      }
      items = LibApiFind.convert_items(items) 
    }
//console.log(items.length);  
    res.json(items);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};