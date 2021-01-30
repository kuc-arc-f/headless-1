import Link from 'next/link';
//import Header from '../Layout/AppHead';

const IndexRow = props => (
  <div>
    <div>
      <Link href={`/content/show?id=${props.id}&site_id=${props.site_id}`}>
        <h3><a>{props.name}</a></h3>
      </Link>
      {props.date} , ID: {props.id}
    </div>
    <div>
      <Link href={`/sites/edit/${props.id}`}>
        <a className="btn btn-sm btn-outline-primary"> Edit</a>
      </Link>
    </div>
  </div>
);
export default IndexRow;
