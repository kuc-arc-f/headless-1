import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import LibCookie from '../../libs/LibCookie'
import Layout from '../../components/layout'
import ContentRow from './ContentRow'
//
export default class extends React.Component {
  static async getInitialProps(ctx){
    console.log(ctx.query.site_id)
    var id = ctx.query.site_id
    const res = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + id)
    const json = await res.json()
    // site_id
    const resColumn = await fetch(process.env.BASE_URL +'/api/columns/list' + id)
    const jsonColumn = await resColumn.json()
  //console.log(jsonColumn)
    var item = json.item
    return { item:item , contents :jsonColumn.items }
  }
  constructor(props){
    super(props)
//console.log(props )
  } 
  componentDidMount(){
    LibCookie.set_cookie("site_id", this.props.item._id ) 
  }   
  render(){
    var site_id= this.props.item._id
console.log("site_id=", site_id )
    var item = this.props.item
    const items = this.props.contents    
console.log(items )
    return (
    <Layout>
      <div className="container">
        <Link href="/sites">
          <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr />
        <div><h1>SiteName : {item.name}</h1>
        </div>
        <div>Content: {item.content}
        </div>
        <hr />  
        {items.map((item, index) => {
  // console.log(item)
          return (<ContentRow key={index} site_id={site_id}
                id={item._id} name={item.name}  />       
          )
        })}          
      </div>
    </Layout>
   )
  }
}




