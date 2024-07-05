import React from 'react';

import "../styles/styles.module.scss";
import Header from "../Components/Header/Header";
import Navbar from "../Components/NavBar/NavBar";
import DownloadSection from "../Components/DownloadSection/downloadSection";
import Footer from "../Components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';  

function index() {
    return (
        <div className="App">
            <Navbar />
            <div className="content">
                <Header />
            </div>
            <div className='Download'>
                <DownloadSection/>
            </div>
            <div className='Footer'>
                <Footer/>
            </div>
        </div>
    );
}

export default index;