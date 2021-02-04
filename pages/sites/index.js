import Link from 'next/link';
import Router from 'next/router'
import Layout from '../../components/layout'
import cookies from 'next-cookies'
import flash from 'next-flash';

import IndexRow from './IndexRow';
//
export default class Page extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch(process.env.BASE_URL+ '/api/sites/list')
    const json = await res.json()
// console.log(json)
    return { 
      items: json.items ,
      user_id :cookies(ctx).user_id,
      flash: flash.get(ctx)|| {},
    }
  }
  constructor(props){
    super(props)
// console.log(props)
  }
  componentDidMount(){
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }    
  }  
  render() {
    const items = this.props.items
// console.log(items)
    return (
    <Layout>
      { this.props.flash.messages_error ? 
      <div className="alert alert-danger" role="alert">{this.props.flash.messages_error}</div> 
      : <div /> }
      <div className="container">
        <Link href="/sites/create">
          <a className="btn btn-primary mt-2">Create Site</a>
        </Link>  
        <hr className="mt-2 mb-2" />        
        <h3>Site :</h3>
        <table className="table table-hover">
          <tbody>
          {items.map((item, index) => {
            return (<IndexRow key={index}
                  id={item._id} name={item.name} date={item.created_at} />       
            )
          })}
          </tbody>
        </table>
      </div>
    </Layout>
    )
  }
}
