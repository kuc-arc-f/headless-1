import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

//import LibCookie from '../../libs/LibCookie'
import Layout from '../../../components/layout'
//
function Page(data) {
console.log(data.item._id )
  var site_id= data.item._id
  var item = data.item
console.log(data.contents )
  // contents
  return (
  <Layout>
    <div className="container">
      <Link href="/sites">
        <a className="btn btn-outline-primary mt-2">Back</a></Link>
      <hr />
      <Link href={`/content_type/create?site_id=${site_id}`}>
        <a className="btn btn-primary mt-2">Create ContentType</a>
      </Link>
      <hr />       
      <div><h1>SiteName : {item.name}</h1>
      </div>
      <div>Content: {item.content}
      </div>
      <hr />      
    </div>
  </Layout>
  )
}
//
Page.getInitialProps = async (ctx) => {
  console.log(ctx.query.id)
  var id = ctx.query.id
  const res = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + id)
  const json = await res.json()

  const resColumn = await fetch(process.env.BASE_URL +'/api/columns/list')
  const jsonColumn = await resColumn.json()
console.log(jsonColumn)
  var item = json.item
  return { item:item , contents :jsonColumn }
}

export default Page

