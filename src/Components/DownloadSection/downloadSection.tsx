import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faPinterest } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const DownloadSection: React.FC = () => {
  return (
    <section className="social text-bg-dark py-6 overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center fs-4 mt-3 p-4">
            <p>
              Stay connected and join our vibrant community, For any
              inquiries or assistance, feel free to reach out to us
            </p>
            <div className="social-icons d-flex justify-content-center gap-4">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
              <FontAwesomeIcon icon={faTwitter} size="2x" />
              <FontAwesomeIcon icon={faInstagram} size="2x" />
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
              <FontAwesomeIcon icon={faPinterest} size="2x" />
            </div>
            <p className="mt-4">Download our app now!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;