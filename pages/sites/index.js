import Link from 'next/link';
import Layout from '../../components/layout'
import cookies from 'next-cookies'

import IndexRow from './IndexRow';
//
export default class Page extends React.Component {
  constructor(props){
    super(props)
//console.log(this.props)
  }  
  static async getInitialProps(ctx) {
    const res = await fetch(process.env.BASE_URL+ '/api/sites/list')
    const json = await res.json()
console.log(json)
    return { 
      items: json.items ,user_id :cookies(ctx).user_id
//      items: []
    }
  }
  render() {
    const items = this.props.items
console.log(items)
    return (
    <Layout>
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
