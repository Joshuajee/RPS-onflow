import { ReactNode } from 'react';
import Footer from '../navigation/Footer';
import Navbar from '../navigation/Navbar';
import Container from './Container';

interface IProps {
    children: ReactNode
}

const Layout = ({children} : IProps) => {

    return (
        <div className={`bg-[#22262E]`}>
            <div className={`flex flex-col min-h-screen overflow-hidden`}>
                <Navbar />
                <div className='relative top-16 flex-grow'>
                    <Container>
                        {children} 
                    </Container>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout