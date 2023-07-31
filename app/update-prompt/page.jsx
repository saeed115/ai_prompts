'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

function EditPrompt() {
	const [prompt, setPrompt] = useState({ prompt: '', tag: '' });
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();

	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');

	useEffect(() => {
		const getPromptDetail = async () => {
			try {
				const response = await fetch(`/api/prompt/${promptId}`);
				const data = await response.json();

				if (response.ok) {
					setPrompt({ prompt: data.prompt, tag: data.tag });
				}
			} catch (error) {
				console.log(error);
			}
		};

		if (promptId) getPromptDetail();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();

		if (!promptId) return alert('Prompt id not found');

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: prompt.prompt,
					tag: prompt.tag,
				}),
			});

			if (response.ok) {
				router.push('/profile');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return <Form type='edit' post={prompt} setPost={setPrompt} handleSubmit={updatePrompt} />;
}

export default EditPrompt;
