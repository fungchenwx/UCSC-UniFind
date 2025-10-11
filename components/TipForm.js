'use client';
import { useState } from 'react';

export default function TipForm({ onSummarize }) {
  const [tip, setTip] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSummarize(tip);
    setTip('');
  };

  return (
    <form onSubmit={handleSubmit} className="stack">
      <label className="label" htmlFor="tip">Enter your course tip</label>
      <textarea
        id="tip"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
        placeholder="Type your tip..."
        className="input"
      />
      <button type="submit" className="submit-button mt-2">
        Summarize
      </button>
    </form>
  );
}
