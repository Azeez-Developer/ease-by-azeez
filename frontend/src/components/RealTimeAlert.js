// src/components/RealTimeAlert.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const RealTimeAlert = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Backend server address

    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket:', socket.id);
    });

    socket.on('bookReturned', (data) => {
      console.log('📚 Book Returned Event:', data);
      setMessage(`📘 Book ID ${data.book_id} is now available!`);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Disconnected from WebSocket');
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      {message && (
        <div style={{ padding: '10px', backgroundColor: '#e0ffe0', border: '1px solid #00aa00', margin: '10px 0' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default RealTimeAlert;
