'use client';

import { useState, useEffect } from 'react';

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';

function OtherProfile({ params }) {
	const [prompts, setPrompts] = useState([]);

	const searchParams = useSearchParams();
	const userName = searchParams.get('name');

	const { id } = params;

	useEffect(() => {
		const getPrompts = async () => {
			try {
				const response = await fetch(`/api/users/${id}/prompts`);
				const data = await response.json();

				if (response.ok) {
					setPrompts(data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		if (id) getPrompts();
	}, []);

	return <Profile name={userName} desc={`Welcome to ${userName} profile`} data={prompts} />;
}

export default OtherProfile;
