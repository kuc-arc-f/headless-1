import React from 'react'

import Layout from '../components/layout'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow';
//
function Page(data) {
// console.log(data.blogs)
  var items = data.blogs.contents
  return (
    <Layout>
      <div className="body_main_wrap">
        <div className="container">test:
        <ul>
        </ul>
        </div>
      </div>
    </Layout>
    )
}
export const getStaticProps = async context => {
//console.log( process.env.API_KEY )
/*
  const res = await fetch(
    `http://hoge.local/api/tasks/list`,
  );
  const blogs = await res.json();
*/
// console.log(process.env.MONGODB_URL)
  return {
    props : {
      blogs: [],
    }
  };
}
export default Page
