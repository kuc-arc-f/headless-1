//LibContent

//
export default {
  get_item : function(items, name){
    var ret = ""
    items.forEach(function(item){
//            console.log(item.id );
      if(item.name === name){
        ret = item.value
      }
    });        
    return ret
  },    
  func1 :async function(){
  },
}
