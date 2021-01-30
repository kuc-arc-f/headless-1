import Link from 'next/link';
//import Header from '../Layout/AppHead';

const IndexRow = props => (
  <tr>
    <td>
      <Link href={`/content/list?site_id=${props.id}`}>
        <h3><a>{props.name}</a></h3>
      </Link>
      {props.date} , ID: {props.id}
    </td>
    <td>
      <Link href={`/content_type/${props.id}`}>
        <a className="btn btn-sm ml-2 btn-outline-primary"> ContentType</a>
      </Link>
    </td>
  </tr>
);
export default IndexRow;
