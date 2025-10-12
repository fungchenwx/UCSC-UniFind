import OpportunitiesTabs from '../components/OpportunitiesTabs';
import Header from '../components/Header';

export default function HomePage() {
    return (
        <main style={{ padding: '2rem', fontFamily: 'var(--ui)' }}>
            <section style={{ marginBottom: '2rem' }}>
                <h2>Welcome to Student Resources</h2>
                <p>Explore opportunities, research, scholarships, and study abroad programs!</p>
            </section>
            <OpportunitiesTabs />
        </main>
    );
}
