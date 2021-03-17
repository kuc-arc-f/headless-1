import LibMongo from "../../../libs/LibMongo"
import LibApiFind from "../../../libs/LibApiFind"

//
export default async function (req, res){
  try{
//console.log(req.query );
    var content_name = req.query.content
    var site_id = req.query.site_id
    var where ={site_id: site_id,
      name: content_name
    }
    var ret = await LibMongo.get_count("contents" , where)
//console.log(ret);
    res.json({count : ret });
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
