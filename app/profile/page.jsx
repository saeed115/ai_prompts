'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

function MyProfile() {
	const [prompts, setPrompts] = useState([]);
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		const getPrompts = async () => {
			setLoading(true);

			try {
				const response = await fetch(`/api/users/${session?.user.id}/prompts`);
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

		if (session?.user.id) getPrompts();
	}, []);

	const handelEdit = async (prompt) => {
		router.push(`/update-prompt?id=${prompt._id}`);
	};

	const handelDelete = async (prompt) => {
		const hasConfirmed = confirm('Are your sure you want to delete this prompt?');

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${prompt._id.toString()}`, { method: 'DELETE' });

				const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);

				setPrompts(filteredPrompts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Profile
			name='My'
			desc='Welcome to your profile'
			data={prompts}
			handelEdit={handelEdit}
			handelDelete={handelDelete}
			loading={loading}
		/>
	);
}

export default MyProfile;
