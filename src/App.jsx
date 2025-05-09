import React, { useState } from 'react';
import './App.css';
import AI_Gen from './components/AI_Gen';
import Normal_Gen from './components/Normal_Gen';
import PaymentSuccess from './components/PaymentSuccess';
import { Routes, Route } from 'react-router-dom';
import AdUnit from './components/AdUnit';

function App() {
  const [mode, setMode] = useState('ai');
  const [password, setPassword] = useState('');

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-container">
            <div className="top-section">
              <div className="ad-left">
                <AdUnit slot="8525326428" />
              </div>

              <div className="main-content">
                <div className="app-header">
                  <h1 className="site-title">PromptPass</h1>
                  <p className="site-subtitle">
                    Turn ideas into strong passwords with a prompt-based generator.
                  </p>
                </div>

                <div className="password-content">
                  {mode === 'ai' ? (
                    <AI_Gen
                      password={password}
                      setPassword={setPassword}
                      onSwitch={() => {
                        setPassword('');
                        setMode('classic');
                      }}
                    />
                  ) : (
                    <Normal_Gen
                      password={password}
                      setPassword={setPassword}
                      onSwitch={() => {
                        setPassword('');
                        setMode('ai');
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="ad-right">
                <AdUnit slot="4822493944" />
              </div>
            </div>

            <div className="ad-bottom">
              <AdUnit slot="9059453553" />
            </div>
          </div>
        }
      />
      <Route path="/payment-success" element={<PaymentSuccess />} />
    </Routes>
  );
}

export default App;