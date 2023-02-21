import { ReactNode } from 'react';
import Footer from '../navigation/Footer';
import Navbar from '../navigation/Navbar';
import Container from './Container';

interface IProps {
    children: ReactNode
}

const Layout = ({children} : IProps) => {
    return (
        <div className='flex flex-col min-h-screen bg-[#22262E]'>
            <Navbar />
            <div className='relative top-16 flex-grow'>
                <Container>
                    {children} 
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default Layout