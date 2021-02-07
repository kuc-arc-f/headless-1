import Link from 'next/link';
import Head from 'next/head';
import flash from 'next-flash';
import React from 'react'
//
export default class Page extends React.Component {
  static async getInitialProps (ctx) {
    return {
//      messagess: flash.get(ctx).messages_success || '',
      messages_error:  this.props.messages_error,
    }
  }  
  componentDidMount(){
    console.log(this.props)
  }
  render(){
    var messages_error = ""
    if( typeof this.props.messages_error != 'undefined'){
      messages_error = this.props.messages_error
    }
    return (
    <div>
      { this.props.messages_success ? 
      <div>FLASH MESSAGE {this.props.messages_success}</div> 
      : <div /> 
      }
      { messages_error ? 
      <div className="alert alert-danger" role="alert">{messages_error}</div> 
      : <div /> }      
    </div>
    );
  }
}
