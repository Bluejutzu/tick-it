import { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function DefaultLayout({ children }: {children: ReactNode}) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Navbar />
      <main className='container flex-1 flex-grow'>{children}</main>
      <Footer />
      <div>
        this is a div
      </div>
    </div>
    
  );

}