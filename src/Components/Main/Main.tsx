import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeToggler from '../ThemeToggler/themeToggler';

const Main = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [comment, setComment] = useState('');
  const [actions, setActions] = useState([]);

  useEffect(() => {
    GetCustomers();
  }, []);

  const GetCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/customers');
      setCustomers(response.data.customers);
    } catch (error) {
      console.error('Failed to Get Customers:', error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/customers', {
        name,
        age,
        comment,
      });
      GetCustomers();
      clearForm();
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(`http://localhost:3000/api/customers/${selectedCustomer.id}`, {
        name,
        age,
        comment,
      });
      GetCustomers();
      clearForm();
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/customers/${id}`);
      GetCustomers();
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setName(customer.name);
    setAge(customer.age);
    setComment(customer.comment);
  };

  const clearForm = () => {
    setSelectedCustomer(null);
    setName('');
    setAge(0);
    setComment('');
  };

  const handleViewCustomerActions = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/customers/${customerId}/actions`);
      setActions(response.data.actions);
    } catch (error) {
      console.error('Failed to View customer actions:', error);
    }
  };

  return (
    <div className={`container py-7`}>
      <header className={`py-7`}>
        <div className="mt-5">
          <div className="d-flex justify-content-end">
            <div className="btn-group">
              <ThemeToggler />
            </div>
          </div>
          <h1 className="mb-4">Customers</h1>
        </div>
      </header>
      <main>
        <div className="py-7 mb-4">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h2 className="mb-4">{selectedCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  {selectedCustomer ? (
                    <button type="button" className="btn btn-success" onClick={handleUpdateCustomer}>Update</button>
                  ) : (
                    <button type="button" className="btn btn-success" onClick={handleAddCustomer}>Add</button>
                  )}
                  <button type="button" className="btn btn-success ms-2" onClick={clearForm}>Clear</button>
                  {selectedCustomer && (
                    <button type="button" className="btn btn-success ms-2" onClick={() => handleViewCustomerActions(selectedCustomer.id)}>View Actions</button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {customers.map((customer) => (
              <div className="col-md-4" key={customer.id}>
                <div
                  className="card mb-3"
                  data-bs-container="body"
                  data-bs-toggle="popover"
                  data-bs-placement="top"
                  data-bs-content={`Email: ${customer.comment}`}
                >
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className="user-img">
                        <img src={`https://randomuser.me/api/portraits/men/${customer.id % 100}.jpg`} />
                      </div>
                      <div className="user-info">
                        <h4>{customer.name}</h4>
                        <h4>{customer.age}</h4>
                        <h4>{customer.comment}</h4>
                        <span className="badge bg-primary">Nature</span>
                        <span className="badge bg-primary">Travel</span>
                        <span className="badge bg-primary">Sports</span>
                        <div className="mt-2">
                          <button className="btn btn-success btn-sm me-2" onClick={() => handleSelectCustomer(customer)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-body">
                  <h3>Customer Actions</h3>
                  <ul>
                    {actions.map((action, index) => (
                      <li key={index}>{action.action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
