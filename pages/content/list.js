//import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import LibCookie from '../../libs/LibCookie'
import LayoutAdmin from '../../components/LayoutAdmin'
import NaviAdmin from '../../components/NaviAdmin'
import Footer from '../../components/Footer'

import ColumnRow from './ColumnRow'
import ContentRow from './ContentRow'
//
export default class extends React.Component {
  static async getInitialProps(ctx){
//    console.log(ctx.query )
    var id = ctx.query.site_id
    var column_id = ""
    var contents = []
    if( typeof ctx.query.column !='undefined'){
      column_id = ctx.query.column
//console.log("column_id=" ,column_id )
      var url_content = '/api/content/list_id?site_id='+ id + "&id=" + column_id
      const resContent = await fetch(process.env.BASE_URL + url_content )
      const jsonContent = await resContent.json()
      contents = jsonContent.items
//console.log(jsonContent.items )
    }
    const res = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + id)
    const json = await res.json()
    const resColumn = await fetch(process.env.BASE_URL +'/api/columns/list?site_id='+ id)
    const jsonColumn = await resColumn.json()
// console.log(jsonColumn)
    var item = json.item
    return { item:item , 
      column_id: column_id,
      columns :jsonColumn.items ,
      contents: contents
    }
  }
  constructor(props){
    super(props)
//console.log(props )
  } 
  componentDidMount(){
    LibCookie.set_cookie("site_id", this.props.item._id ) 
  }   
  render(){
//console.log( "column_id=", this.props.column_id)
    var column_id = this.props.column_id
    var site_id= this.props.item._id
//console.log("site_id=", site_id )
    var item = this.props.item
    var content_url =`/content/edit?site_id=${site_id}&content_name=${item.name}`
    var url_new = `/content/create?content_id=${column_id}&site_id=${site_id}`
    const contents = this.props.contents    
    const items = this.props.columns    
// console.log(item )
    return (
    <LayoutAdmin >
      <NaviAdmin  site_name={item.name} site_id={item._id} /> 
      <div className="container">
        <Link href="/sites">
          <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr className="mt-2 mb-2" />
        <div><h1>Site : {item.name}</h1>
        </div>
        <div className="row">
          <div className="col-sm-6">Site_id : {item._id}
          </div>
          <div className="col-sm-6">
            <div>{item.content}</div>
          </div>
        </div>
        <hr className="mt-1 mb-1" />
        <div className="row">
          <div className="col-sm-4">
            <h3>Content ⇓</h3> 
            <hr className="mt-2 mb-2" />
            {items.map((item, index) => {
      // console.log(item)
              return (<ColumnRow key={index} site_id={site_id}
                    id={item._id} name={item.name}  />       
              )
            })}          
          </div>
          <div className="col-sm-8">
            {column_id ? 
            <div>
              <Link href={url_new}>
                <a className="btn btn-primary mt-2">Ceate Content</a>
              </Link>
              <hr />            
            </div>
            : ""}
          {contents.map((item, index) => {
  //console.log(item )
  //console.log(item.content_name )
            var values = item.values
  //console.log( item.values )
            return(<ContentRow key={index}
              id={item._id} date={item.created_at}
              content_url={content_url+ `&id=${item._id}`} 
              row1_name={values[0].name} row1_value={values[0].value } />
            )
          })}            
          </div>
        </div>

      </div>
      <Footer />
    </LayoutAdmin>
   )
  }
}




