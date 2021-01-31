import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import LayoutAdmin from '../../components/LayoutAdmin'
//import NaviAdmin from '../../components/NaviAdmin'
import NaviColumns from '../../components/NaviColumns'

import LibContentType from '../../libs/LibContentType'
import InputRow from './InputRow'
//
export default class extends Component {
  static async getInitialProps(ctx) {
console.log(ctx.query.site_id )
    var url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
//console.log(json)
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
      site_id: ctx.query.site_id
    }
  }  
  constructor(props){
    super(props)
    this.state = {name: '', content: '', _token : '', form_item_arr:null}
    this.handleClick = this.handleClick.bind(this);
    this.database = null
// console.log(props)
  }
  componentDidMount(){
    var arr = []
    for(var i= 0;i < 10; i++){
      var item = {  index : i }
      arr.push(item)
    }
    this.setState({ _token: this.props.csrf.token,
      form_item_arr: arr 
    });
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }
  }   
  handleChangeTitle(e){
    this.setState({name: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
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
//        var d = formData.get('colmun[0]name');     
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
    if(this.state.form_item_arr instanceof Array){
      return this.state.form_item_arr.map((item, index) => {
// console.log(item.index)
        return (<InputRow key={index} index={item.index} 
                />
        )        
      })
    }
  }
  render() {
//console.log(this.props.site_id)
    return (
    <LayoutAdmin>
      <NaviColumns  site_name={""} site_id={this.props.site_id} /> 
      <div className="container">
        <form action="/api/columns/new" method="post" id="myForm" name="myForm">
          <input type="hidden" id="colmuns_json" name="colmuns_json" />
          <input type="hidden" id="site_id" name="site_id" value={this.props.site_id}/>          
          <Link href={`/content_type/${this.props.site_id}`}>
            <a className="btn btn-outline-primary mt-2">Back</a></Link>
          <hr className="mt-2 mb-2" />
          <h3>Content - Create</h3>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>Content Name:</label>
              <input type="text" name="content_name"
              className="form-control"
                />
              <span className="mt-0"><br />*) 半角英数、アンダースコア( _ )が入力可能です。</span>
            </div>
          </div>
          <hr className="mt-0 mb-0" />
          <h3>Colmun Setting :</h3>
          <hr />
          {this.tabRow()}
        </form>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick}>Create
          </button>
        </div>                
      </div>
    </LayoutAdmin>
    )    
  } 
}

