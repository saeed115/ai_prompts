import PromptCard from './PromptCard';

function Profile({ name, data, desc, handelEdit, handelDelete }) {
	return (
		<section className='w-full'>
			<h1 className='head_text text-left'>
				<span className='orange_gradient'>{name} Profile</span>
			</h1>

			<p className='desc text-left'>{desc}</p>

			<div className='mt-10 prompt_layout'>
				{data.map((prompt) => (
					<PromptCard
						prompt={prompt}
						handelEdit={() => handelEdit && handelEdit(prompt)}
						handelDelete={() => handelDelete && handelDelete(prompt)}
						key={prompt._id}
					/>
				))}
			</div>
		</section>
	);
}

export default Profile;
