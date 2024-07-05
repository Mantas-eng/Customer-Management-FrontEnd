import React, { useState, useEffect } from 'react';
import { Navbar, Container, Form, Alert } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import LogoIMG from "../logo/sproud-leaf_logo.png";
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError('Visi laukai yra privalomi');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`http://localhost:3000/api/login`, formData);
      console.log('Login response:', response.data);

      const { token } = response.data;
      Cookies.set('token', token, { expires: 1 });

      router.push('/');

    } catch (error) {
      console.error('Login error:', error);
      setError('Prisijungimo klaida. Patikrinkite prisijungimo duomenis ir bandykite dar kartą.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isRegistered = localStorage.getItem('registered');
    if (isRegistered === 'success') {
      setRegistered(true);
      Cookies.remove('token');
    }
  }, []);

  return (
    <Container className="custom-container">      
      <div className='row justify-content-center mt-5'>
        <div className='col-12 text-center mt-5'>
        <Link href="/" passHref>
          <img
            src={LogoIMG.src}
            width="120"
            height="120"
            alt="React Bootstrap logo"
          />
        </Link>
        </div>
        
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 col-xxl-4 px-0 pb-3">
          <Form onSubmit={handleSubmit}>
            <div className="container-fluid p-0">
              <div className="row nobg gx-0">
                <div className="col-12 py-2 px-0">
                  <Form.Floating className="form-input">
                    <Form.Control
                    
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      autoComplete="username"
                      tabIndex={3}
                      required
                    />
                    <Form.Label htmlFor="username">Prisijungimo vardas</Form.Label>
                  </Form.Floating>
                </div>
                <div className="col-12 py-2 px-0">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="current-password"
                      required
                    />
                    <label  htmlFor="password">Slaptažodis</label>
                  </div>
                </div>
                <div className="col-12 pb-3 px-0">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="rememberThis"
                      name="remember_this"
                      tabIndex={3}
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="rememberThis">Prisiminti mane</label>
                  </div>
                </div>
                <div className="col-12 py-2 px-0">
                  <input name="recaptcha" className="recaptcha" type="hidden" value="unset" />
                  <button type="submit" className="btn btn-dark py-3 w-100 text-uppercase" id="submit_button" disabled={loading}>
                    {loading ? 'Vyksta prisijungimas...' : 'Prisijungti'}
                  </button>

                  {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                  {registered && <Alert variant="success" className="mt-2">Jūs sėkmingai užsiregistravote!</Alert>}

                  <Link href="/RegisterPage">
                    <div className="btn btn-success btn-sm py-2 w-100 text-uppercase mt-2 ">Registracija</div>
                  </Link>
                  <div className="text-center mt-3"></div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
