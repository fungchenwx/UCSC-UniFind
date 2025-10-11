'use client';
import { useState } from 'react';
import TipForm from '../components/TipForm';
import SummaryBox from '../components/SummaryBox';

export default function Page() {
  const [summary, setSummary] = useState('');

  const handleSummarize = async (tip) => {
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tip }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <div>
      <TipForm onSummarize={handleSummarize} />
      <SummaryBox summary={summary} />
    </div>
  );
}
