import Link from 'next/link';

const IndexRow = props => (
  <div>
    <div>
      <h3><a>{props.name}</a></h3>
      {props.date} , {props.id}
    </div>
    <div>
      <Link href={`/content_type/edit?content_type_id=${props.id}`}>
        <a className="btn btn-sm btn-outline-primary"> Edit</a>
      </Link>
    </div>
  </div>
);
export default IndexRow;
