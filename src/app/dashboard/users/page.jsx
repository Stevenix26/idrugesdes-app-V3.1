'use client'
// Import other necessary dependencies
import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import { Button } from '@nextui-org/react';

const prisma = new PrismaClient();

async function getServerSideProps() {
  const users = await prisma.user.findMany();
  return {
    props: {
      initialUsers: users,
    },
  };
}

async function saveUser(user) {
  const response = await fetch('../../server/api/routers/users.ts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

// ... (previous code)

const Page = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers || []);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch initial data here if needed
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      name: name,
    };

    try {
      const savedUser = await saveUser(user);
      setUsers((prevUsers) => [...prevUsers, savedUser]);
      setEmail('');
      setName('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <section className='w-96 bg-gray-200 p-8 rounded shadow-lg'>
          <h2 className='text-2xl font-bold mb-6'>User Form</h2>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-600'>
                Email
              </label>
              <input
                type='text'
                className='mt-1 p-2 w-full border rounded-md'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-600'>
                Name
              </label>
              <input
                type='text'
                className='mt-1 p-2 w-full border rounded-md'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button type='submit' color='success' variant='flat' className='w-full'>
              <input type="submit" />
            </Button>
          </form>

          <div className='mt-6 text-blue-400'>
            <h2 className='text-2xl font-bold mb-4'>User Data Table</h2>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='border p-2'>Email</th>
                  <th className='border p-2'>Name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className='border'>
                    <td className='border p-2'>{user ? user.email : 'Invalid User Data'}</td>
                    <td className='border p-2'>{user ? user.name : 'Invalid User Data'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;

