import Link from 'next/link';

const IndexRow = props => (
  <div>
    <div>
      <h3><a>{ props.row1_name} : { props.row1_value }</a></h3>
      Date: {props.date} , ID: {props.id}
    </div>
    <div>
      <Link href={props.content_url}>
        <a className="btn btn-sm btn-outline-primary"> Edit</a>
      </Link>
    </div>
  </div>
);
export default IndexRow;
