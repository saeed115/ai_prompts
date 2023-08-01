'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';
import Loading from './Loading';

const PromptCardList = ({ data, handelTagClick }) => {
	return (
		<div className='prompt_layout'>
			{data.map((prompt) => (
				<PromptCard
					prompt={prompt}
					handelTagClick={() => handelTagClick(prompt)}
					key={prompt._id}
				/>
			))}
		</div>
	);
};

function Feed() {
	const [prompts, setPrompts] = useState([]);
	const [loading, setLoading] = useState(false);

	const [searchText, setSearchText] = useState('');
	const [searchResult, setSearchResult] = useState([]);

	const filterPrompts = (term) => {
		const regex = new RegExp(term, 'i');

		return prompts.filter(
			(prompt) =>
				regex.test(prompt.creator.username) ||
				regex.test(prompt.tag) ||
				regex.test(prompt.prompt)
		);
	};

	const handleSearchChange = async (e) => {
		e.preventDefault();

		setSearchText(e.target.value);

		if (searchText) {
			const newPrompts = filterPrompts(e.target.value);
			setSearchResult(newPrompts);
		}
	};

	const handelTagClick = (prompt) => {
		setSearchText(prompt.tag);

		const newPrompts = filterPrompts(prompt.tag);
		setSearchResult(newPrompts);
	};

	useEffect(() => {
		const getPrompts = async () => {
			setLoading(true);

			try {
				const response = await fetch('/api/prompt');
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

		getPrompts();
	}, []);

	return (
		<section className='feed'>
			<form className='w-full max-w-xl flex-center relative'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					onChange={handleSearchChange}
					value={searchText}
					className='search_input'
				/>
			</form>

			{loading ? (
				<Loading />
			) : (
				<PromptCardList
					data={searchText ? searchResult : prompts}
					handelTagClick={handelTagClick}
				/>
			)}
		</section>
	);
}

export default Feed;
