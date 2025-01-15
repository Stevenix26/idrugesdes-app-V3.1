// PrescriptionForm.js
"use client"
import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import './post.css'

const PrescriptionForm = () => {
  const[selectedFile, setSelectedFile] = useState(null);
  const[previewURL, setPreviewURL] = useState("")

  const [formData, setFormData] = useState({
    patientName:"",
    doctorName: "",
    medication: "",
    prescriptionFile:selectedFile,
  });

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleFileInputChange = async (event)=>{
      const file = event.target.files[0]

      console.log(file)
    }

  // const { register, handleSubmit, formState: { errors }, setError } = useForm();
  // const queryClient = useQueryClient();

  // const { mutate: createPrescription } = useMutation({
  //   mutationFn: async (prescriptionData) => {
  //     return axios.post('/api/prescriptions', prescriptionDataform);
  //   },
  //   onError: (error) => {
  //     console.error('Error submitting prescription:', error);
  //   },
  //   onSuccess: (data) => {
  //     console.log('Prescription submitted successfully:', data);
  //     // Invalidate and refetch the prescriptions query
  //     queryClient.invalidateQueries('prescriptions');
  //   },
  // });

   const submitHandler = async event=>{
    event.preventDefault(); 
   }

  // const onSubmit = async (data) => {
  //   try {
  //     await createPrescription.mutate(data);
  //     // Prescription successfully submitted
  //   } catch (error) {
  //     console.error('Error submitting prescription:', error);
  //     setError('submit', { type: 'manual', message: 'Failed to submit prescription.' });
  //   }
  // };

  return (
    <section className='px-5 xl:px-0'>
    <div className="max-w-[1170px] items-center justify-between">
        <div className="dashboard">
          <div className="dashboard-nav">
            <div>Dashboard</div>
            <div>Users</div>
            <div>Products</div>
            <div>Transactions</div>
            <div>Stats</div>
            <div>Logs</div>
            <div>Messages</div>
            <div className="nav-selected">!! Settings</div>
          </div>
          <div className="dashboard-content">
            <div className="data-card">
              <div className="data-card-header">
                <div>Total Page Views</div>
                <div>89,400</div>
                <div className="data-card-subtitle">21% more than last month</div>
              </div>
              <div className="data-card-footer">
                <div className="data-card-stats">
                  <div>Transactions</div>
                  <div className="stats-data">
                    <div>Cy Ganderton</div>
                    <div>Hart Hagerty</div>
                    <div>Jim Hagerty</div>
                    <div>Hart Hagerty</div>
                    <div>Hart Hagerty</div>
                    <div>Brice Swyre</div>
                  </div>
                </div>
                <div className="data-card-sources">
                  <div>Sources</div>
                  <div className="sources-data">
                    <div>Direct: 12</div>
                    <div>Social: 34</div>
                    <div>Search: 1,230</div>
                    <div>Email: 1,234</div>
                    <div>Forms and inputs: 84,920</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="data-card">
              <div className="data-card-header">
                <div>Products</div>
              </div>
              <div className="data-card-form">
                <div className="form-section">
                  <div className="form-label">Product name</div>
                  <input type="text" />
                </div>
                <div className="form-section">
                  <div className="form-label">Category</div>
                  <select>
                    <option value="public">Public</option>
                    <option value="featured">Featured product</option>
                  </select>
                </div>
                <div className="form-section">
                  <div className="form-label">Size (cm)</div>
                  <input type="number" />
                </div>
                <div className="form-section">
                  <div className="form-label">Width</div>
                  <input type="number" />
                </div>
                <div className="form-section">
                  <div className="form-label">Choose product visibility</div>
                  <select>
                    <option value="managers">Visible only for managers</option>
                    <option value="all">Visible for all users</option>
                  </select>
                </div>
              </div>
              <div className="data-card-payment">
                <div className="payment-header">Payment information</div>
                <div className="payment-form">
                  <div className="form-section">
                    <div className="form-label">Card Number</div>
                    <input type="text" />
                  </div>
                  <div className="form-section">
                    <div className="form-label">Expiration date</div>
                    <input type="text" />
                  </div>
                  <div className="form-section">
                    <div className="form-label">CVV</div>
                    <input type="text" />
                  </div>
                </div>
                <div className="payment-total">
                  <div className="total-label">Total</div>
                  <div className="total-amount">$250</div>
                </div>
                <div className="payment-buttons">
                  <button>Confirm Payment</button>
                  <label>
                    <input type="checkbox" />
                    Save my card information for future payments
                  </label>
                  <label>
                    Accept terms of use and privac policy
                    <input type="checkbox" />
                  </label>
                </div>
              </div>
            </div>
            <div className="data-card">
              <div className="data-card-header">
                <div>Downloads</div>
                <div>32,800</div>
                <div className="data-card-subtitle">From 84 countries</div>
              </div>
              <div className="data-card-stats">
                <div>Recent user transactions</div>
                <div className="stats-data">
                  <div>
                    <div>Hart Hagerty</div>
                    <div>United States</div>
                  </div>
                  <div>
                    <div>Brice Swyre</div>
                    <div>China</div>
                  </div>
                  <div>
                    <div>Marjy Ferencz</div>
                    <div>Russia</div>
                  </div>
                  <div>
                    <div>Yancy Tear</div>
                    <div>Brazil</div>
                  </div>
                  <div>
                    <div>Marjy Ferencz</div>
                    <div>Russia</div>
                  </div>
                  <div>
                    <div>Hart Hagerty</div>
                    <div>United States</div>
                  </div>
                  <div>
                    <div>Hart Hagerty</div>
                    <div>United States</div>
                  </div>
                  <div>
                    <div>Hart Hagerty</div>
                    <div>United States</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </section>
  );
};

export default PrescriptionForm;
