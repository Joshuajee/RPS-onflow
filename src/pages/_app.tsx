import AuthProvider from '@/contexts/AuthContext'
import TransactionProvider from '@/contexts/TransactionContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@/flow/config";
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);



  return ( 
    <TransactionProvider>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} hideProgressBar={true} position="bottom-right" theme='dark'/>
      </AuthProvider>
    </TransactionProvider>
  )
}
