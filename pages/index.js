import React from 'react'
import cookies from 'next-cookies'

import Layout from '../components/layout'
import LoginBox from '../components/LoginBox'
//
function Home(data) {
  console.log( "user_id=", data.user_id )
    return (
    <Layout>
      <hr />
      <LoginBox user_id={data.user_id} />
      <div className="container mb-0">
        <h1>Home</h1>
        <p>This is home page.</p>
        <br /><br /><br />
      </div>
      <hr className="mb-0"/>
      <br /><br /><br /><br />
    </Layout>
    )
  }
  //
  Home.getInitialProps = async (ctx) => {
    console.log("uid=", cookies(ctx).user_id)
    return { user_id: cookies(ctx).user_id }
  }
  
  export default Home