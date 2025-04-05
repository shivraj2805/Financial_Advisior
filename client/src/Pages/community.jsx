import React, { useState } from 'react';

const DiscussionForums = () => {
  const [joinedForums, setJoinedForums] = useState(new Set());

  const forums = [
    {
      id: 1,
      title: "Business Funding",
      description: "Discuss various funding options and strategies for your business ventures",
      members: 2456,
      posts: 1289
    },
    {
      id: 2,
      title: "Budgeting for Families",
      description: "Share tips and advice on managing family finances effectively",
      members: 3892,
      posts: 2341
    },
    {
      id: 3,
      title: "Microloans for Women",
      description: "Connect with other women entrepreneurs and discuss microloan opportunities",
      members: 1845,
      posts: 956
    },
    {
      id: 4,
      title: "Poultry Group",
      description: "Exchange knowledge about poultry farming and management",
      members: 1234,
      posts: 678
    },
    {
      id: 5,
      title: "Dairy Group",
      description: "Discuss dairy farming techniques and market opportunities",
      members: 2123,
      posts: 1432
    }
  ];

  const handleJoinForum = (forumId) => {
    setJoinedForums(prev => {
      const newSet = new Set(prev);
      if (newSet.has(forumId)) {
        newSet.delete(forumId);
      } else {
        newSet.add(forumId);
      }
      return newSet;
    });
  };

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-white p-8">
      <div className="max-w-6xl mx-auto h-full bg-gradient-to-br from-green-50 to-white p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Discussion Forums</h1>
        <p className="text-green-600 mb-8">Join our community and connect with peers in your field of interest</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg-gradient-to-br from-green-50 to-white p-8">
          {forums.map(forum => (
            <div key={forum.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">{forum.title}</h3>
                <p className="text-gray-600 mb-4">{forum.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {forum.members.toLocaleString()} members
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    {forum.posts.toLocaleString()} posts
                  </span>
                </div>

                <button
                  onClick={() => {handleJoinForum(forum.id);window.location.href = '/dairy';}}
                  
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-300 ${
                    joinedForums.has(forum.id)
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {joinedForums.has(forum.id) ? 'Leave Forum' : 'Join Forum'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscussionForums;