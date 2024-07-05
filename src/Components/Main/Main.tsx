import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/styles.module.scss'; 

const Main = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [comment, setComment] = useState('');
  const [customerActions, setCustomerActions] = useState([]);

  useEffect(() => {
    GetCustomers();
  }, []);

  const GetCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/customers');
      setCustomers(response.data.customers);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
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

  const handleSelectCustomer = async (customer) => {
    setSelectedCustomer(customer);
    setName(customer.name);
    setAge(customer.age);
    setComment(customer.comment);

    try {
      const response = await axios.get(`http://localhost:3000/api/customers/${customer.id}/actions`);
      setCustomerActions(response.data.actions);
    } catch (error) {
      console.error('Failed to fetch customer actions:', error);
    }
  };

  const clearForm = () => {
    setSelectedCustomer(null);
    setName('');
    setAge(0);
    setComment('');
    setCustomerActions([]);
  };

  return (
    <div className={`${styles.main} py-7`}>
      <div>
        <h2 className={styles.h2}>Customers</h2>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.name} - {customer.age} - {customer.comment}
              <button onClick={() => handleSelectCustomer(customer)}>Edit</button>
              <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
              <button onClick={() => handleSelectCustomer(customer)}>View Actions</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedCustomer && (
        <div>
          <h2>{selectedCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          <input
            type="text"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {selectedCustomer ? (
            <button onClick={handleUpdateCustomer}>Update</button>
          ) : (
            <button onClick={handleAddCustomer}>Add</button>
          )}
          <button onClick={clearForm}>Clear</button>
        </div>
      )}

      {customerActions.length > 0 && (
        <div>
          <h2>Customer Actions</h2>
          <ul>
            {customerActions.map((action) => (
              <li key={action.id}>
                {action.action} - {action.timestamp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Main;
