import './globals.css';
import Header from '../components/Header'; // correct relative path

export const metadata = {
  title: 'Student Resources',
  description: 'Your gateway to opportunities, research, scholarships & study abroad',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
