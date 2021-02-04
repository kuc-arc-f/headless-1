import Link from 'next/link';
import Head from 'next/head';
//
export default function Page(props){
//console.log(props)
  var paginateDisp = props.paginateDisp
  var nextPage = parseInt(props.page) + 1
  var url =`/content/list?site_id=${props.site_id}&column=${props.column_id}&page=1`
  var url_next =`/content/list?site_id=${props.site_id}&column=${props.column_id}`
  url_next += "&page=" + nextPage
// console.log(url_next)
  return (
  <div>
    { paginateDisp ? (
    <div className="paginate_wrap">
      <div className="btn-group" role="group" aria-label="Basic example">
        <Link href={url}><a className="btn btn-lg btn-outline-primary">
          1st</a></Link>
          <Link href={url_next}><a className="btn btn-lg btn-outline-primary">
          > </a></Link>
      </div>
    </div>
    ):"" 
    }    
  </div>
  );
}
