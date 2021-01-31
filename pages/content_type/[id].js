import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

//import Layout from '../../components/layout'
import LayoutAdmin from '../../components/LayoutAdmin'
import NaviColumns from '../../components/NaviColumns'
import ContentRow from './ContentRow'
//
function Page(data) {
console.log(data.item._id )
  var site_id= data.item._id
  var item = data.item
  const items = data.contents 
//  console.log(items )
  return (
  <LayoutAdmin>
    <NaviColumns  site_name={item.name} site_id={item._id} />
    <div className="container">
      <Link href="/sites">
        <a className="btn btn-outline-primary mt-2">Back</a></Link>
      <hr />
      <Link href={`/content_type/create?site_id=${site_id}`}>
        <a className="btn btn-primary mt-2">Create ContentType</a>
      </Link>
      <hr />       
      <div><h1>Site : {item.name}</h1>
      </div>
      <div>Content: {item.content}
      </div>
      <hr />
      <h3>Content ⇓</h3>
      <hr /> 
      {items.map((item, index) => {
// console.log(item)
        return (<ContentRow key={index} site_id={site_id}
          id={item._id} name={item.name} date={item.created_at} />       
        )
      })}       

    </div>
  </LayoutAdmin>
  )
}
//
Page.getInitialProps = async (ctx) => {
  console.log(ctx.query.id)
  var id = ctx.query.id
  const res = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + id)
  const json = await res.json()

  const resColumn = await fetch(process.env.BASE_URL +'/api/columns/list?site_id='+ id)
  const jsonColumn = await resColumn.json()
// console.log( jsonColumn.items )
  var item = json.item
  return { item:item , contents :jsonColumn.items }
}

export default Page

