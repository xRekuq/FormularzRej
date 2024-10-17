// src/App.js
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import './App.css';

function App() {
  console.log('Rendering App component'); // Add this line

  return (
    <div className="App">
      <RegistrationForm />
    </div>
  );
}

export default App;
