import Head from 'next/head';
import styles from './dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Spacer } from '@/components/Layout';
import { useCallback, useRef, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import mongoose from 'mongoose';
import mqtt from 'mqtt';
import { use } from 'passport';

const getLoggedInUser = () => {
  const loggedInUser = Cookies.get('uname');
  return loggedInUser;
};
const axios = require('axios');

//---------------------------------------------------------------------------------------------------------------------
const DashboardPage = () => {
  const [cars, setCars] = useState([]);
  const Amount = useRef();
  const Des = useRef();
  const [imgURL, setImgURL] = useState('');
  const [payment, setPayment] = useState('');
  const [paymentid, setPaymentid] = useState('');
  const [showModal, setShowModal] = useState(false);

  const initiatePayment = async (amt, des) => {
    const paymentData = {
      merchantId: '5e99a4841dffb500067c6d62',
      paymentProfileId: '5e99a48d1dffb500067c6d63',
      amount: amt, // Amount in cents (e.g., 10.00 EUR would be 1000)
      currency: 'EUR',
      reference: 'Test payment',
      description: des,
      callbackUrl: 'https://www.testcallback.com/payconiq/payment',
    };

    try {
      const response = await axios.post('/api/payconiq', paymentData);
      // const imgURL = ;
      setImgURL(response.data._links.qrcode.href);
      console.log('Payment initiated:', response.data);
      // console.log('Payment initiated:', imgURL);
      setPaymentid(response.data.paymentId);
      // var res = getPaymentDetails(response.data.paymentId)
      console.log(paymentid);
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle errors here
    }
  };
  const axios = require('axios');

  const getPaymentDetails = async (paymentId) => {
    const apiKey = 'fbae8c3f-c2b3-4d44-be7c-37147654ac5c'; // Replace with your actual API key
    const apiUrl = `/api/paymentDetails?paymentId=${paymentId}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      setPayment(response.data.status);
      return response.data.status; // Return payment details
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw new Error('Failed to fetch payment details');
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const amt = Amount.current.value; // Access .current.value directly
    const des = Des.current.value; // Access .current.value directly
    try {
      const response = await initiatePayment(amt, des);
      setShowModal(true); // Display modal with QR code
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
    // await initiatePayment();
    // Call the initiatePayment function when the form is submitted
  };
  const handlePaymentStatus = async (e) => {
    e.preventDefault();
    getPaymentDetails(paymentid);
  };

  useEffect(() => {
    const u = getLoggedInUser();
    console.log(u);
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchUserData?username=${u}`);
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
  //--------------
  const pollPaymentStatus = async () => {
    if (paymentid) {
      try {
        var status = await getPaymentDetails(paymentid);
        setPayment(status);
        console.log(payment);
        if (payment === 'SUCCEEDED') {
          // setShowModal(false);
          setPayment('');
          status = '';
          setTimeout(() => {
          }, 1000);
          // Show a success message to the user
          // alert('Payment successful!');
        } else {
          // alert('Payment Not successful!');
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
        throw new Error('Failed to fetch payment details');
      }
    }
  };
  const showAlert = () => {
    // Code to display the alert box (you can use a state variable to control the alert display)
    alert('Payment successful!');
  };
  useEffect(() => {
    const pollingInterval = setInterval(() => {
      pollPaymentStatus();
    }, 1000); // Poll every 5 seconds

    return () => clearInterval(pollingInterval);
  }, [paymentid]);

  //----------------
  return (
    <>
      <Spacer size={0.5} axis="vertical" />
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
          <div className="row mt-5 .bg-dark">
            <div className="col-md-4">
              <div className="card mb-4">
                <img
                  src="/images/car.jpg"
                  className="card-img-top"
                  alt="Car Photo"
                ></img>
                <div className="card-body">
                  <h5 className="card-title">Car Details</h5>
                  <p className="card-text ">Make: {cars.carnickname}</p>
                  <p className="card-text">Model: {cars.carmodelname}</p>
                  <p className="card-text">License Plate: {cars.carnoplate}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Your Credits</h5>
                  <p className="card-text">Available Credit: ₹{cars.credit}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="container mt-4">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Purchase Credit</h5>
                        <form id="creditPurchaseForm">
                          <div className="form-group">
                            <label htmlFor="amount">Amount:</label>
                            <input
                              type="number"
                              className="form-control"
                              id="amount"
                              name="amount"
                              ref={Amount}
                              // onChange={setAmount((e)=>e.target.value)}
                              placeholder="Enter amount in cents"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input
                              type="text"
                              ref={Des}
                              className="form-control"
                              id="description"
                              // onChange={setDes(e=>e.target.value)}
                              name="description"
                              placeholder="Enter description"
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handlePayment}
                          >
                            Submit
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handlePaymentStatus}
                          >
                            Check payment status
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img src={imgURL} alt="Payment QR Code" /> */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </div>

      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog modal-lg h-50" role="document">
            <div className="modal-content h-100">
              {/* Modal header */}
              <div className="modal-header">
                {/* Close button */}
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              {/* Modal body */}
              <div className="modal-body">
                {/* Display the QR code here */}
                <img src={imgURL} alt="Payment QR Code" />
                {payment}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage; // Apply the withAuth middleware to the DashboardPage
