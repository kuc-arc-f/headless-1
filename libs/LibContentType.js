

//
export default {
    valid_form :function(formData){
        try {
            var ret = false
            var content_name = formData.get( "content_name" )
console.log( content_name)
            if(content_name == ""){
                alert("Error, content_name is required.")
                return ret
            }
            return true
        } catch (err) {
//            console.error(`Error: ${JSON.stringify(err)}`)
            throw new Error('Error , get_show_item');
        }          
    },    
    func1 :async function(){
    },

}
