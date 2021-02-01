import Link from 'next/link';
//import Header from '../Layout/AppHead';

const IndexRow = props => (
  <div>
    <div>
      <Link href={`/content/list?site_id=${props.site_id}&column=${props.id}`}>
        <h3><a>{props.name}</a></h3>
      </Link>
      ID: {props.id}
    </div>
  </div>
);
export default IndexRow;
