'use client'
// components/Dashboard.js
import Image from 'next/image';

const Dashboard = () => {
  const handleUpload = (files) => {
    // Handle file upload logic here
    console.log('Uploaded files:', files);
  };

  return (

    <section className='px-5 xl:px-0'>
      <div className="max-w-[1170px] items-center justify-center">
        <div className='grid grid-cols-1 card lg:grid-flow-cols-2 p-6 rounded-md shadow-m'>
   
    <div className="grid items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <div className="stats shadow-lg ">

        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>

      </div>
      
          <div className="max-w-xl items-center justify-center">
          <Image
            src="/pharmacy.svg" // Replace with your actual SVG image
            alt="Pharmacy Store"
            width={700}
            height={200}
            className='shadow'
          />
        </div>
      

      <div className='space-y-2'/>
      </div>


       <div className='space-y-2'/>
      </div>
    </div> 
    </section>
  );
};

export default Dashboard;
