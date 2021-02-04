import Link from 'next/link';
import Router from 'next/router'
import cookies from 'next-cookies'
import flash from 'next-flash';

import Layout from '../../components/layout'
import IndexRow from './IndexRow';
//
function Page(data) {
  //console.log(data.item.id )
    var item = data.item
    /*
    if(item == null){
      flash.set({ messages_error: 'Error, apikey get' })
      Router.push('/sites');
      return
    }
    */
console.log(item )
    return (
    <Layout>
      <div className="container">
        <Link href="/sites">
          <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr />
        <h1>API KEY</h1>
        <hr />
        API_KEY : {item.key}
        <hr />       
      </div>
    </Layout>
    )
  }
  Page.getInitialProps = async (ctx) => {
console.log(ctx.query.id)
    var id = ctx.query.id
    const res = await fetch(process.env.BASE_URL +'/api/sites/apikey?id=' + id)
    const json = await res.json()
    var item = json.item
//console.log( item )
    return { item: item }
  }
  
  export default Page
