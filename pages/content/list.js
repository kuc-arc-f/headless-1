import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import LibCookie from '../../libs/LibCookie'
import LayoutAdmin from '../../components/LayoutAdmin'
import NaviAdmin from '../../components/NaviAdmin'

import ContenRow from './ContenRow'
//
export default class extends React.Component {
  static async getInitialProps(ctx){
    console.log(ctx.query.site_id)
    var id = ctx.query.site_id
    const res = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + id)
    const json = await res.json()
    const resColumn = await fetch(process.env.BASE_URL +'/api/columns/list?site_id='+ id)
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
//console.log("site_id=", site_id )
    var item = this.props.item
    const items = this.props.contents    
console.log(item )
    return (
    <LayoutAdmin >
      <NaviAdmin  site_name={item.name} site_id={item._id} /> 
      <div className="container">
        <Link href="/sites">
          <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr className="mt-2 mb-2" />
        <div><h1>Site : {item.name}</h1>
        </div>
        Site_id : {item._id}
        <hr className="mt-2 mb-2"/>
        <div>{item.content}
        </div>
        <hr className="mt-2 mb-2" />
        <h3>Content ⇓</h3>  
        <hr className="mt-2 mb-2" />
        {items.map((item, index) => {
  // console.log(item)
          return (<ContenRow key={index} site_id={site_id}
                id={item._id} name={item.name}  />       
          )
        })}          
      </div>
    </LayoutAdmin>
   )
  }
}




