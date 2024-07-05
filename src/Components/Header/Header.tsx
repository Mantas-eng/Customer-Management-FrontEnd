import React from 'react';
import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/styles.module.scss';
import Main from '../Main/Main';

const Header: React.FC = () => {
  return (
    <header className={`${styles.header} py-7`}>
      <Container>
        <div className='row mb-2 text-center'>
          <div className="col-12 text-container">
            <h1 className='display-2 text-white mt-5'>
            Customer Management App
            </h1>
            <p className="lead text-white w-75 m-auto mb-4">
              Discover the latest movies and immerse yourself in the unparalleled world of cinematic magic
            </p>
          </div>
        </div>
        <div className='row  text-center'>
          <div className="col-12 text-container">
          <Main />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;