
//
export default {
  add_test :async function(num){
    try{
      var content_name ="test_1"
      var item = {
        title:"title-" + num,
        content: "content-" + num,
      }
      const res = await fetch(process.env.BASE_URL + '/api/post/create/'+ content_name, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',  'apikey': process.env.API_KEY
        },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        const json = await res.json()
        console.log(json)
      } else {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error, add_test ");
    }
  },
  func2 :function(){
      console.log('#_func2')
      this.func1()
  },

}
