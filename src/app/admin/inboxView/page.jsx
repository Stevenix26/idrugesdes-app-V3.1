"use client";

import React, { useState } from 'react';
import { UserCircle, PaperPlaneRight, Clock, CheckCircle } from '@phosphor-icons/react/dist/ssr';

// Dummy data for demonstration
const conversations = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '',
    lastMessage: 'Thank you for your help!',
    lastMessageTime: '10:45 AM',
    unread: true,
    messages: [
      { id: 1, sender: 'John Doe', text: 'Hi, I need help with my prescription.', time: '10:30 AM', status: 'read' },
      { id: 2, sender: 'Admin', text: 'Sure, how can I assist you?', time: '10:32 AM', status: 'read' },
      { id: 3, sender: 'John Doe', text: 'I have a question about dosage.', time: '10:35 AM', status: 'delivered' },
      { id: 4, sender: 'Admin', text: 'Please provide your prescription ID.', time: '10:40 AM', status: 'sent' },
      { id: 5, sender: 'John Doe', text: 'Thank you for your help!', time: '10:45 AM', status: 'delivered' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: '',
    lastMessage: 'Can I get a refill?',
    lastMessageTime: 'Yesterday',
    unread: false,
    messages: [
      { id: 1, sender: 'Jane Smith', text: 'Can I get a refill?', time: 'Yesterday', status: 'read' },
      { id: 2, sender: 'Admin', text: 'Of course, let me check your records.', time: 'Yesterday', status: 'read' },
    ],
  },
];

const InboxViewPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [reply, setReply] = useState('');

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (reply.trim() === '') return;
    // Here you would send the reply to the backend
    setReply('');
  };

  return (
    <div className="flex flex-col md:flex-row h-[80vh] bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Conversation List */}
      <aside className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Inbox</h2>
        </div>
        <ul>
          {conversations.map((conv) => (
            <li
              key={conv.id}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900 transition ${selectedConversation.id === conv.id ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
              onClick={() => handleSelectConversation(conv)}
            >
              <div className="relative mr-3">
                {conv.avatar ? (
                  <img src={conv.avatar} alt={conv.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-200 text-indigo-700 font-bold">
                    {conv.name.charAt(0)}
                  </span>
                )}
                {conv.unread && <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100 truncate">{conv.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{conv.lastMessageTime}</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 truncate">{conv.lastMessage}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Message Details */}
      <section className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="mr-4">
            {selectedConversation.avatar ? (
              <img src={selectedConversation.avatar} alt={selectedConversation.name} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-200 text-indigo-700 font-bold">
                {selectedConversation.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{selectedConversation.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Active now</div>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col space-y-4">
            {selectedConversation.messages.map((msg, idx) => (
              <div key={msg.id} className={`flex ${msg.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow-sm ${msg.sender === 'Admin' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'}`}>
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-semibold mr-2">{msg.sender}</span>
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock size={12} className="mr-1" />{msg.time}
                    </span>
                  </div>
                  <div className="text-sm">{msg.text}</div>
                  <div className="flex justify-end mt-1">
                    {msg.status === 'read' && <CheckCircle size={14} className="text-green-500" title="Read" />}
                    {msg.status === 'delivered' && <CheckCircle size={14} className="text-blue-500" title="Delivered" />}
                    {msg.status === 'sent' && <CheckCircle size={14} className="text-gray-400" title="Sent" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Reply Box */}
        <form onSubmit={handleSendReply} className="flex items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message..."
            value={reply}
            onChange={handleReplyChange}
          />
          <button
            type="submit"
            className="ml-3 p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition"
            aria-label="Send"
          >
            <PaperPlaneRight size={22} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default InboxViewPage;