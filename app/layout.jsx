import { Inter } from 'next/font/google';

import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { ThemeProvider } from './ThemeProvider';

export const metadata = {
	title: 'Promptopia',
	description: 'Discover & Share AI prompts',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<Provider>
						<div className='main'>
							<div className='gradient' />
						</div>
						<main className='app'>
							<Nav />
							{children}
						</main>
					</Provider>
				</ThemeProvider>
			</body>
		</html>
	);
}
