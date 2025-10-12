'use client';
import { useEffect, useState } from 'react';

export default function Scholarships() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/scholarships')
            .then(res => res.json())
            .then(d => setData(d))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading Scholarships...</p>;
    if (!data.length) return <p>No opportunities available.</p>;

    return (
        <ul>
            {data.map((item, i) => (
                <li key={i}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                </li>
            ))}
        </ul>
    );
}
