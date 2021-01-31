import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import LibCookie from '../../libs/LibCookie'
//import Layout from '../../components/layout'
import LayoutAdmin from '../../components/LayoutAdmin'
import NaviAdmin from '../../components/NaviAdmin'
import ContentRow from './ContentRow'
//
export default class extends React.Component {
  static async getInitialProps(ctx) {
//    console.log(ctx.query.site_id )
    var id = ctx.query.id
    var site_id = ctx.query.site_id
  console.log( id ,site_id )
  // 
    const res = await fetch(process.env.BASE_URL +'/api/columns/show?id=' + id)
    const json = await res.json()
    var item = json.item
    var cole_name = item.name + "_"+site_id
    var url = '/api/content/list?cname=' + item.name
    url += "&site_id=" + site_id
// console.log( url )
    const resContent = await fetch(process.env.BASE_URL + url )
    const jsonContet = await resContent.json()
// console.log( "coll_name=", cole_name)
    var columns = JSON.parse(item.values || '[]')
//  console.log( columns )
    return { id: id, site_id: site_id,
      item: item ,columns: columns, cole_name:cole_name,
      jsonContet: jsonContet
    }
  }
  constructor(props){
    super(props)
// console.log(props )
  }  
  render() {
//    console.log("id=" , data.id )
    var item = this.props.item
//    var columns = this.props.columns
    var content_id = this.props.id
    var content_name = item.name
    var site_id = this.props.site_id
    var contents = this.props.jsonContet.items
// console.log(contents)
    var content_url =`/content/edit?site_id=${site_id}&content_name=${content_name}`
    var url_new = `/content/create?content_id=${content_id}&site_id=${site_id}`
    return (
    <LayoutAdmin>
      <NaviAdmin  site_name={""} site_id={site_id} /> 
      <div className="container">
        <Link href={`/content/list?site_id=${site_id}`}>
          <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr />
        <Link href={url_new}>
          <a className="btn btn-primary mt-2">New</a>
        </Link>
        <hr />       
        <div><h1>{content_name}</h1>
        </div>
        <div>Content: {item.content}
        </div>
        <hr />
        {contents.map((item, index) => {
//console.log(item )
//console.log(item.content_name )
          var values = item.values
//console.log( item.values )
          return(<ContentRow key={index}
             id={item._id} date={item.created_at}
             site_id={site_id} content_name={content_name}
             content_url={content_url+ `&id=${item._id}`} 
             row1_name={values[0].name} row1_value={values[0].value } />
          )
        })}    
      </div>
    </LayoutAdmin>
    )
  }
}

