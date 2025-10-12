'use client';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="header">
        <div className="header-container">
            <div className="logo">
            <Image
                src="/images/graduate-hat.png"
                alt="Graduation Hat"
                width={28}
                height={28}
                unoptimized
            />
            </div>

            <div className="header-text">
            <h1>Student Resources</h1>
            <p>Your gateway to opportunities, research, scholarships & study abroad</p>
            </div>
        </div>
        </header>
    );
}
