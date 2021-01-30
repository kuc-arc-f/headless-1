// LibApiFind

//
export default {
  convert_items: function(items){
    var ret =[]
    items.forEach(function(item){
//console.log("id=" ,item._id)
      var row ={
        id: item._id,
        _id: item._id,
        created_at: item.created_at,
      }
      item.values.forEach(function(value_item){
        row[value_item.name] = value_item.value
//            console.log(value_item.name , value_item.value)
      })
      ret.push(row)                        
    });        
    return ret
  },
  convertItemOne: function(item){
    var ret ={}
    var row ={
      id: item._id,
      _id: item._id,
      created_at: item.created_at,
    }
    item.values.forEach(function(value_item){
      row[value_item.name] = value_item.value
//            console.log(value_item.name , value_item.value)
    })
    ret = row
    return ret
  },

}
