import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer: React.FC = () => {
  return (
    <footer className="border-top border-secondary bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-8 d-flex justify-content-center justify-content-md-start">
            <ul className="nav">
              <li className="nav-item">
                <a href="index.html" className="nav-link link-light">Home</a>
              </li>
              <li className="nav-item">
                <a href="#details" className="nav-link link-light">Details</a>
              </li>
              <li className="nav-item">
                <a href="contact.html" className="nav-link link-light">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-0">
              Copyright &copy; HorrorHub 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;