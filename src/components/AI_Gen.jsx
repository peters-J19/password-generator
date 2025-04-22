import React, { useState } from 'react';
import './AI_Gen.css';

function AI_Gen({ setPassword, password, onSwitch }) {
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [promptCount, setPromptCount] = useState(() => parseInt(localStorage.getItem('promptCount')) || 0);
  const [promptCredits, setPromptCredits] = useState(() => parseInt(localStorage.getItem('promptCredits')) || null);
  const [lockedOut, setLockedOut] = useState(() => (promptCredits || 3) <= promptCount);

  const generateWithAI = async () => {
    if (lockedOut || !aiPrompt.trim()) return;

    try {
      setLoading(true);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Generate a secure password based on this description: "${aiPrompt}". Return only the password, with no explanation. Make sure the length is between 4 and 32 characters.`,
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const result = data.choices?.[0]?.message?.content?.trim() || '';
      setPassword(result);

      const newCount = promptCount + 1;
      localStorage.setItem('promptCount', newCount);
      setPromptCount(newCount);

      const limit = promptCredits || 3;
      if (newCount >= limit) {
        setLockedOut(true);
        if (promptCredits && newCount >= promptCredits) {
          localStorage.removeItem('promptCredits');
          setPromptCredits(null);
        }
      }
    } catch (err) {
      alert("Failed to generate password with AI.");
    } finally {
      setLoading(false);
    }
  };

  const getStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 2) return { label: 'Weak', color: 'red' };
    if (score <= 4) return { label: 'Moderate', color: 'orange' };
    return { label: 'Strong', color: 'green' };
  };

  return (
    <div className="ai-container">
      <p className="description">Generate a custom password using AI. Describe what kind of password you'd like below!</p>
      <p className="sub-description">Or use the button below to navigate to normal password generation.</p>

      <textarea
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        placeholder="e.g. A strong password with numbers, symbols, and a cat pun"
        rows={4}
        maxLength={300}
      />

      <div className="ai-stats">
        <div>{aiPrompt.length}/300 characters</div>
        <div>Prompts used: {promptCount} / {promptCredits || 3}</div>
      </div>

      <div className="btn-container">
        <button onClick={generateWithAI} disabled={loading || lockedOut}>
          {lockedOut ? "Limit Reached" : loading ? "Generating..." : "Generate with AI"}
        </button>
        <button className="toggle-button" onClick={onSwitch}>Or Use Normal Password Generator</button>
      </div>

      {password && (
        <div className="password-box">
          <strong>{password}</strong><br />
          <button
            onClick={() => {
              navigator.clipboard.writeText(password);
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            }}
          >
            Copy
          </button>

          {copied && <div className="copied-message">Password copied to clipboard!</div>}

          <div className="password-strength">
            Password Strength:{' '}
            <span style={{ color: getStrength(password).color }}>
              {getStrength(password).label}
            </span>
          </div>
        </div>
      )}

      {lockedOut && (
        <div className="locked-out-message">
          <p><strong>You've used all {promptCredits || 3} AI prompts.</strong></p>
          <p>Buy 20 more for just $1</p>
          <a href="https://buy.stripe.com/test_eVag1h0fF2ig3xCeUU" target="_blank" rel="noopener noreferrer">
            Purchase More Prompts ($1)
          </a>
        </div>
      )}
    </div>
  );
}

export default AI_Gen;