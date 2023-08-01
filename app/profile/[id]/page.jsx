'use client';

import { useState, useEffect } from 'react';

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';

function OtherProfile({ params }) {
	const [prompts, setPrompts] = useState([]);
	const [loading, setLoading] = useState(false);

	const searchParams = useSearchParams();
	const userName = searchParams.get('name');

	const { id } = params;

	useEffect(() => {
		const getPrompts = async () => {
			setLoading(true);

			try {
				const response = await fetch(`/api/users/${id}/prompts`);
				const data = await response.json();

				if (response.ok) {
					setPrompts(data);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		if (id) getPrompts();
	}, []);

	return (
		<Profile
			name={userName}
			desc={`Welcome to ${userName} profile`}
			data={prompts}
			loading={loading}
		/>
	);
}

export default OtherProfile;
