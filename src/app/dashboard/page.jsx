'use client'
// components/Dashboard.js
import { Card, Spacer, Upload, Button } from '@nextui-org/react';
import Image from 'next/image';

const Dashboard = () => {
  const handleUpload = (files) => {
    // Handle file upload logic here
    console.log('Uploaded files:', files);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pharmacy Dashboard</h1>
      
      <Card>
        <div className="flex items-center justify-center">
          <Image
            src="/images/p7.jpg" // Replace with your actual SVG image
            alt="Pharmacy Store"
            width={200}
            height={200}
          />
        </div>
      </Card>

      <Spacer y={2} />

      <Card>
        <h2 className="text-xl font-semibold mb-2">Upload Documents</h2>
        <p className="text-gray-600 mb-4">Upload necessary documents here.</p>
          <Button  >Upload Files
        <input type="file" name="file" id="" onUpload={handleUpload} accept=".pdf,.doc,.docx,.jpg,.png"/>
          
          </Button>
        
      </Card>

      <Spacer y={2} />

      <Card>
        <h2 className="text-xl font-semibold mb-2">Sample Content</h2>
        <p className="text-gray-600">
          This is some sample content for your pharmacy dashboard.
        </p>
      </Card>
    </div>
  );
};

export default Dashboard;
