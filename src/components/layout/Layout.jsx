import React from 'react';
import Navbar from './NavBar';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div >
                <div className='col'>
                    <Navbar />
                    <div id="section" className='container px-0  pt-5 my-5'>
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Layout;