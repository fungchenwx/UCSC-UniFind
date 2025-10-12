'use client';
import { useEffect, useState } from 'react';

export default function Research() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/research-opportunities')
      .then(res => res.json())
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading Research Opportunities...</p>;
  if (!data.length) return <p>No opportunities available.</p>;

  return (
    <ul>
      {data.map((item, i) => (
        <li key={i}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <h3>{item.title}</h3>
          </a>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
