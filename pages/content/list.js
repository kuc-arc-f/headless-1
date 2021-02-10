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
    return { 
      query: ctx.query,
      flash: flash.get(ctx)|| {},
    }
  }
  constructor(props){
    super(props)
    this.state = {
      item: {}, 
      column_id: "",
      site_id: this.props.query.site_id,
      columns : [],
      contents: [],
      apikey: '',
      pagingDisplay: 0,
      page: 0,
    }
  } 
  async componentDidMount(){
// console.log(this.props.query )
    var column_id = ""
    var site_id = this.props.query.site_id
    var contents = []
    var page = 1    
    var display = 0
    LibCookie.set_cookie("site_id", this.props.query.site_id )
    const res = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + site_id)
    const json = await res.json()
    const resColumn = await fetch(process.env.BASE_URL +'/api/columns/list?site_id='+ site_id)
    const jsonColumn = await resColumn.json()    
    var item = json.item
    var apikey = json.apikey 
    if( typeof this.props.query.column !='undefined'){
      column_id = this.props.query.column
      var url_content = '/api/content/list_id?site_id='+ site_id + "&id=" + column_id
//      url_content += "&page=" + String(page)
      const resContent = await fetch(process.env.BASE_URL + url_content )
      const jsonContent = await resContent.json()
      contents = jsonContent.items
      contents = LibCommon.convert_items(contents)    
    }    
//console.log( json )  
    this.setState({
      item:item , 
      column_id: column_id,
      columns :jsonColumn.items ,
      contents: contents,
      apikey: apikey,
      pagingDisplay: display,
      page: page,
    })    
  }   
  async handleClickColumn(id){
//console.log( "handleClickColumn=", id )
      var site_id= this.state.site_id
      var url_content = '/api/content/list_id?site_id='+ site_id + "&id=" + id
  //    url_content += "&page=" + String(page)
      const resContent = await fetch(process.env.BASE_URL + url_content )
      const jsonContent = await resContent.json()
      var contents = jsonContent.items
      LibPagenate.init()
      var display = LibPagenate.is_paging_display(contents.length)  
      contents = LibCommon.convert_items(contents)       
// console.log( contents )
      this.setState({ contents: contents,
        column_id: id,
        pagingDisplay: display,
      })     
      var elemKey = document.getElementById('search_key');
      elemKey.value = ""
      this.addSearchEvent(elemKey)
  }
  async addSearchEvent(elem){
    var self = this
    elem.addEventListener('keypress',async function(e){
      try {
        if (e.keyCode === 13) {
//          console.log( "keyCode=" , e.keyCode )
//console.log("#addSearchEvent=" , elem.value )
          var column_id = self.state.column_id
          var site_id= self.state.item._id
          var item = {
            search_key: elem.value,
            column_id: column_id,
            site_id: site_id,
          }
          const res = await fetch(process.env.BASE_URL + '/api/content/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(item),
          });
          if (res.status === 200) {
            const json = await res.json()
            self.setState({ contents: json.items ,
              pagingDisplay: 0,
            });
          } else {
            throw new Error(await res.text());
          } 
          return false;          
        }
      } catch (error) {
        alert("Error, addSearchEvent")
        console.error(error);
      }       
    });
  }
  render(){
    var column_id = this.state.column_id
    var site_id= this.state.site_id
    var key = ""
    if(this.state.apikey != null){
      key = this.state.apikey.key
    }
    var item = {}
    if( this.state.item instanceof Object){
      item = this.state.item
    }
    var paginateDisp = this.state.pagingDisplay
    var messages_error = ""
    if( typeof this.props.flash.messages_error != 'undefined'){
      messages_error = this.props.flash.messages_error
    }    
    var content_url =`/content/edit?site_id=${site_id}&content_name=${item.name}`
    var url_new = `/content/create?content_id=${column_id}&site_id=${site_id}`
    var contents = this.state.contents 
    const items = this.state.columns 
//console.log( items )
// console.log("pagingDisplay=" ,this.props.pagingDisplay )
    return (
    <LayoutAdmin >
      <NaviAdmin  site_name={item.name} site_id={item._id} />
      <FlashBox messages_error={messages_error} />
      <div className="container content_list_wrap">
        <div className="row">
          <div className="col-sm-4">
            <Link href="/sites">
              <a className="btn btn-outline-primary mt-2">Back</a></Link>
          </div>
          <div className="col-sm-8">
            <h1>{item.name}</h1>
          </div>
        </div>
          <hr className="mt-0 mb-2" />
          <div className="row">
          <div className="col-sm-4 p_apikey">Site_id : {item._id}<br />
          </div>
          <div className="col-sm-4 p_apikey" >
            API KEY : {key}
          </div>
          <div className="col-sm-4 webhook_wrap" >
            <Link href={`/sites/webook?site_id=${site_id}`}>
            <a className="btn btn-sm btn-outline-primary mt-0 ml-2">Webook </a>
          </Link>
          </div>
        </div>
        <hr className="mt-2 mb-2" />
        <div className="row">
          <div className="col-sm-4">
            <h3 className="content_title">Content Name :</h3> 
            <hr className="mt-2 mb-2" />
            {items.map((item, index) => {
      // console.log(item)
              return(
              <div key={index}>
                <div className="row">
                  <div className="col-sm-8">
                    <button className="btn btn-sm btn-outline-primary"
                    onClick={this.handleClickColumn.bind(this, item._id)}>{item.name}
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <span className="name_arrow">
                      <i className="fas fa-arrow-circle-right ml-3"></i>
                    </span>
                  </div>
                </div>
                <hr className="mt-2 mb-2"/>
              </div>              
              )
            })}          
          </div>
          <div className="col-sm-8">
            {column_id ? 
            <div>
              <Link href={url_new}>
                <a className="btn btn-sm btn-primary mt-0">Ceate Content</a>
              </Link>
                <input type="text" id="search_key" name="search_key" 
                className="form-control mt-2"placeholder="Search key input , and Return" />
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
          </div>          
        </div>
      </div> 
      <Footer />
    </LayoutAdmin>
   )
  }
}
