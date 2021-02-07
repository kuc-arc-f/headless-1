//import Head from 'next/head'
import React from 'react'
import Link from 'next/link';
import flash from 'next-flash';

import LibCookie from '../../libs/LibCookie'
import LibPagenate from '../../libs/LibPagenate'
import LibCommon from '../../libs/LibCommon'
import LayoutAdmin from '../../components/LayoutAdmin'
import NaviAdmin from '../../components/NaviAdmin'
import Footer from '../../components/Footer'
import PagingBox from '../../components/PagingBox'
import FlashBox from '../../components/FlashBox'

import ColumnRow from './ColumnRow'
import ContentRow from './ContentRow'

//
export default class extends React.Component {
  static async getInitialProps(ctx){
//console.log(ctx.query )
    var id = ctx.query.site_id
    var column_id = ""
    var contents = []
    var page = 1
//console.log("page=" , ctx.query.page )
    if( typeof ctx.query.column !='undefined'){
      column_id = ctx.query.column
      if(typeof ctx.query.page !='undefined'){
        page = ctx.query.page
      }
      var url_content = '/api/content/list_id?site_id='+ id + "&id=" + column_id
      url_content += "&page=" + String(page)
      const resContent = await fetch(process.env.BASE_URL + url_content )
      const jsonContent = await resContent.json()
      contents = jsonContent.items
      LibPagenate.init()
      var display = LibPagenate.is_paging_display(contents.length)  
      contents = LibCommon.convert_items(contents)    
// console.log(contents )
    }
    const res = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + id)
    const json = await res.json()
    const resColumn = await fetch(process.env.BASE_URL +'/api/columns/list?site_id='+ id)
    const jsonColumn = await resColumn.json()
//console.log(json)
    var item = json.item
    var apikey = json.apikey
    return { item:item , 
      column_id: column_id,
      columns :jsonColumn.items ,
      contents: contents,
      apikey: apikey,
      pagingDisplay: display,
      page: page,
      flash: flash.get(ctx)|| {},
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
//console.log( this.props.apikey)
    var column_id = this.props.column_id
    var site_id= this.props.item._id
    var key = ""
    if(this.props.apikey != null){
      key = this.props.apikey.key
    }
// console.log("key=", key )
    var item = this.props.item
    var content_url =`/content/edit?site_id=${site_id}&content_name=${item.name}`
    var url_new = `/content/create?content_id=${column_id}&site_id=${site_id}`
    const contents = this.props.contents    
    const items = this.props.columns   
// console.log(contents)
    var paginateDisp = this.props.pagingDisplay
    var messages_error = ""
    if( typeof this.props.flash.messages_error != 'undefined'){
      messages_error = this.props.flash.messages_error
    }
// console.log("pagingDisplay=" ,this.props.pagingDisplay )
    return (
    <LayoutAdmin >
      <NaviAdmin  site_name={item.name} site_id={item._id} /> 
      <FlashBox messages_error={messages_error} />
      <div className="container content_list_wrap">
        <Link href="/sites">
          <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr className="mt-2 mb-2" />
        <div className="row">
          <div className="col-sm-6">
            <h3>Site : {item.name}</h3>
          </div>
          <div className="col-sm-6">
            <Link href={`/sites/webook?site_id=${site_id}`}>
            <a className="btn btn-outline-primary mt-2 ml-2">Webook </a>
          </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">Site_id : {item._id}<br />
          API KEY : {key}
          </div>
          <div className="col-sm-6">
            <div>{item.content}</div>
          </div>
        </div>
        <hr className="mt-2 mb-2" />
        <div className="row">
          <div className="col-sm-4">
            <h3>Content Name :</h3> 
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
            </div>
            : ""}
            <table className="table table-hover content_table mt-2">
            <thead>
              <tr><th>Data</th><th>Actions</th>
              </tr>
            </thead>  
            <tbody>
            {contents.map((item, index) => {
    //console.log(item )
              var values = item.values
    //console.log( item.values )
              return(<ContentRow key={index}
                id={item._id} date={item.created_at}
                content_url={content_url+ `&id=${item._id}`} 
                row1_name={values[0].name} row1_value={values[0].value } />
              )
            })}
            </tbody>            
            </table>
            <div className="paging_box_wrap mt-3">
              <PagingBox page={this.props.page} paginateDisp={paginateDisp} 
              site_id={site_id} column_id={column_id} />
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </LayoutAdmin>
   )
  }
}




