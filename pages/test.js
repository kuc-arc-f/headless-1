import React from 'react'

import Layout from '../components/layout'
import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import LibTest from '../libs/LibTest'
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
//
export const getStaticProps = async context => {
console.log(process.env.API_KEY)
  try {
    for(var i=1; i <= 30; i++){
//      await LibTest.add_test(i)
    }
    return {
      props : {
        blogs: [],
      }
    };
  } catch (error) {
    console.error(error);
  }
}
export default Page
