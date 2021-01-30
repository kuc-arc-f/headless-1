import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import Layout from '../../components/layout'
import LibContentType from '../../libs/LibContentType'
// import InputRow from './InputRow'
import EditRow from './EditRow'
//
export default class extends Component {
  static async getInitialProps(ctx) {
console.log("q=", ctx.query)
    var column_id = ctx.query.content_type_id
    var url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    const resColmun = await fetch(process.env.BASE_URL +'/api/columns/show?id=' + column_id)
    const jsonColmun = await resColmun.json() 
    var columns = JSON.parse(jsonColmun.item.values || '[]') 
//console.log( columns )
    return { 
      user_id :cookies(ctx).user_id,
      column_id: column_id,
      csrf: json.csrf,
      site_id: ctx.query.site_id,
      columns: columns,
      colmun_item: jsonColmun.item,
    }
  }  
  constructor(props){
    super(props)
    this.state = {
      name: '', content: '', _token : '', form_item_arr:null,
      content_name: '', columns: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.database = null
//console.log(props)
  }
  componentDidMount(){
//console.log( this.props.columns )
    var arr = []
    for(var i= 0;i < 10; i++){
      var item = {  index : i }
      arr.push(item)
    }
    this.setState({ _token: this.props.csrf.token,
      form_item_arr: arr, content_name: this.props.colmun_item.name, 
      columns: this.props.columns
    });
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }
  }
  handleChange(event) {
//console.log(event.target.name )
    const value = event.target.value;
    if(event.target.name == "content_name"){
      this.setState({ content_name: value });
    }
  }       
  handleClick(){
    this.add_item()
  } 
  async add_item(){
    try {
      var myForm = document.getElementById('myForm');
      var formData = new FormData(myForm); 
      var valid = LibContentType.valid_form(formData)
      if(valid==false){ throw new Error('Invalid , valid_form'); }
//console.log(valid)
      var elem = []
      for(var i= 0; i< 10; i++){
        var inputName = "colmun["+i+"]name"
        var inputType = "colmun["+i+"]type"
        var name = formData.get( inputName )
        var type = formData.get( inputType )        
        var item = {
          name: name,
          type: type,
        }
        elem.push(item)
//console.log(name, i)
      }
      var json= JSON.stringify( elem );
//console.log(json)
      var elemJson = document.getElementById('colmuns_json');
      elemJson.value = json
      document.myForm.submit()
// console.log(item)
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  } 
  tabRow(){
    if(this.state.columns instanceof Array){
      return this.state.columns.map((item, index) => {
//console.log(item )
        return (<EditRow key={index} index={index} 
          name={ item.name} type={item.type}
                />
        )        
      })
    }
  }
  render() {
//console.log(this.props.site_id)
    return (
    <Layout>
      <div className="container">
        <form action="/api/columns/update" method="post" id="myForm" name="myForm">
          <input type="hidden" id="colmuns_json" name="colmuns_json" />
          <input type="hidden" id="site_id" name="site_id" value={this.props.site_id}/>  
          <input type="hidden" id="id" name="id" value={this.props.column_id}/>  
          <Link href="/sites">
            <a className="btn btn-outline-primary mt-2">Back</a></Link>
          <hr className="mt-2 mb-2" />
          <h3>Content - Create</h3>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>Content Name:</label>
              <input type="text" name="content_name"
              className="form-control" value={this.state.content_name}
              onChange={this.handleChange.bind(this)}  />
            </div>
          </div>
          <hr />
          <h3>Colmun Setting :</h3>
          <hr />
          {this.tabRow()}
        </form>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick}>Create
          </button>
        </div>                
      </div>
    </Layout>
    )    
  } 
}

