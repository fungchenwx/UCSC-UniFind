import './globals.css';

export const metadata = {
  title: 'Resources Help',
  description: 'Discover resources and opportunities for UCSC students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
