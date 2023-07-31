'use client';

import { useState, useEffect } from 'react';

import Profile from '@components/Profile';

function OtherProfile({ params }) {
	const [prompts, setPrompts] = useState([]);

	const { id, name } = params;

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

	return <Profile name={name} desc={`Welcome to ${name} profile`} data={prompts} />;
}

export default OtherProfile;
