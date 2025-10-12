'use client';
import { useEffect, useState } from 'react';

export default function StudyAbroad() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/study-abroad')
            .then(res => res.json())
            .then(d => setData(d))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading Study Abroad programs...</p>;
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
