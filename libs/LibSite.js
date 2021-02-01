//LibSite

//
export default {
  valid_form :function(formData){
    try {
      var ret = false
      var name = formData.get( "name" )
//console.log( name)
      if(name == ""){
          alert("Error, name is required.")
          return ret
      }
      return true
    } catch (err) {
//            console.error(`Error: ${JSON.stringify(err)}`)
      throw new Error('Error , get_show_item');
    }          
  },  
}
