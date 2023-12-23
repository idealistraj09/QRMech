import Head from 'next/head';
import styles from './dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Spacer } from '@/components/Layout';
import { useCallback, useRef, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import mongoose from 'mongoose';
import { user } from '@/api-lib/constants';
import {Users} from '../../pages/api/user'
const getLoggedInUser = () => {
  const loggedInUser = Cookies.get('uname');
  return loggedInUser;
};

const DashboardPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetchUserData');
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Spacer></Spacer>
      <Head>
        <title>Dashboard</title>
        <link rel="stylesheet" href="./dashboard.module.css" />
      </Head>
      <div className={styles.maindiv}>
        <div
          className={styles.maindiv}
          style={{ width: '80%', position: 'relative', left: '10%' }}
        >
          <h1>Charging Center</h1>
          <div class="row mt-5 .bg-dark">
            <div class="col-md-4">
              <div class="card mb-4">
                <img
                  src="/images/car.jpg"
                  class="card-img-top"
                  alt="Car Photo"
                ></img>
                <div class="card-body">
                  <h5 class="card-title">Car Details</h5>
                  <p class="card-text ">Make: {cars.email}</p>
                  <p class="card-text">Model: Model S</p>
                  <p class="card-text">License Plate: ABC123</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">Your Credits</h5>
                  <p class="card-text">Available Credit: $50</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">Purchase Credit</h5>
                  <select
                    class="form-select mb-3"
                    aria-label="Select Credit Package"
                  >
                    <option selected>Select a package</option>
                    <option value="1">$10 - 50 credits</option>
                    <option value="2">$20 - 100 credits</option>
                    <option value="3">$50 - 250 credits</option>
                  </select>

                  <div class="mb-3">
                    <label htmlFor="cardNumber" class="form-label">
                      Card Number
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="cardNumber"
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label htmlFor="expiryDate" class="form-label">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="expiryDate"
                    ></input>
                  </div>
                  <div class="mb-3">
                    <label htmlFor="cvv" class="form-label">
                      CVV
                    </label>
                    <input type="text" class="form-control" id="cvv"></input>
                  </div>
                  <button type="button" class="btn btn-primary">
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </div>
    </>
  );
};

export default DashboardPage; // Apply the withAuth middleware to the DashboardPage
