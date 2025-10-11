import '../styles/globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'Course Tips',
  description: 'Share and summarize course tips',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container">
          {children}
        </main>
        <footer className="footer">
          &copy; 2025 Course Tips
        </footer>
      </body>
    </html>
  );
}
