import React from 'react'
import cookies from 'next-cookies'

import Layout from '../components/layout'
import LoginBox from '../components/LoginBox'
import LibConst from '../libs/LibConst'

//
function Home(data) {
// console.log( "user_id=", data.user_id )
    return (
    <Layout>
      <div className="container mb-0">
        <br />
        <LoginBox user_id={data.user_id} />
        <p className="mt-2">version : { data.version }</p>
        <h1>Home</h1>
        <p>welcome , headless-1</p>
        <br /><br /><br />
      </div>
      <hr className="mb-0"/>
      <br /><br /><br /><br />
    </Layout>
    )
  }
  //
  Home.getInitialProps = async (ctx) => {
//    console.log("uid=", cookies(ctx).user_id, LibConst.get_config().VERSION )
    return { user_id: cookies(ctx).user_id ,
      version: LibConst.get_config().VERSION
    }
  }
  
  export default Home