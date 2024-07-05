import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import styles from '@/styles/styles.module.scss';
import LogoIMG from '@/logo/creatiive_logo.png'; 
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY < 50) {
        navbar?.classList.add('bg-dark');
        navbar?.classList.add('navbar-sticky');
      } else {
        navbar?.classList.remove('bg-dark');
        navbar?.classList.remove('navbar-sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleShowModal = () => {
    // Implement your modal logic here
  };

  return (
    <>
      <Navbar
        expand="lg"
        className={`${styles.navbar} navbar navbar-expand-lg fixed-top navbar-dark bg-dark navbar-sticky`}
      >
        <Container>
          <Link href="/" passHref>
            <img
              src={LogoIMG.src}
              width="150"
              height="120"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#discover">Discover</Nav.Link>
              <Nav.Link href="#summary">Summary</Nav.Link>
              <Nav.Link href="#takeaways">Takeaways</Nav.Link>
              <Nav.Link href="#subscribe">Subscribe</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <Button variant="success" onClick={handleShowModal} className="text-uppercase">
                  <FontAwesomeIcon icon={faUser} />
                  <span className="ms-2">User</span>
                </Button>
              ) : (
                <Link href="/LoginPage" passHref>
                  <Button variant="success" className="text-uppercase">
                    Prisijungti
                  </Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default App;
