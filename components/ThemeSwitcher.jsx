'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<button className='p-2' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
			{theme === 'light' ? (
				<Image src='/assets/icons/moon.svg' width={20} height={20} />
			) : (
				<Image src='/assets/icons/sun.svg' width={24} height={24} />
			)}
		</button>
	);
};
