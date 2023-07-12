import './globals.css';
import { Inter } from 'next/font/google';
import { WagmiProvider } from './_components';
import Header from './header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider>
          <Header />
          {children}
        </WagmiProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Bank microservices',
  description: 'Microservices starter app for a banking case scenario.'
};
