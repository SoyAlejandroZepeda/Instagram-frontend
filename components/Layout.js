import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {

     //Routing
     const router = useRouter();

     return(
          <>
               <Head>
                    <title>Instagram</title>
                    <link rel="shortcut icon" href="favicon.ico" />
               </Head>

               { children }
          </>
     )
}

export default Layout;