import Link from 'next/link';
//import Header from '../Layout/AppHead';

const IndexRow = props => (
  <tr>
    <td>
      <Link href={`/sites/${props.id}`}>
        <h3><a>{props.name}</a></h3>
      </Link>
      {props.date} , ID: {props.id}
    </td>
    <td>
      <Link href={`/sites/edit/${props.id}`}>
        <a className="btn btn-sm btn-outline-primary"> Edit</a>
      </Link>
    </td>
  </tr>
);
export default IndexRow;
