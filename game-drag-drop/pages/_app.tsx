import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GetServerSideProps } from "next";
import { resetServerContext } from "react-beautiful-dnd";


function MyApp1({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}


export default MyApp1


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log('reset1!!!');
  resetServerContext()   // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } }

}

