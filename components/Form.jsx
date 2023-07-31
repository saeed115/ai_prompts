import Image from 'next/image';
import Link from 'next/link';

function Form({ type, submitting, post, setPost, handleSubmit }) {
	return (
		<section className='w-full max-w-full flex-center flex-col mb-10'>
			<h1 className='head_text capitalize'>
				<span className='orange_gradient'>{type} Prompt</span>
			</h1>

			<p className='desc max-w-sm text-center'>
				<span className='capitalize'>{type}</span> and shear amazing prompt with world, to
				run wild with any AI-powered tool
			</p>

			<form
				onSubmit={handleSubmit}
				className='w-full mt-10 gap-7 max-w-2xl flex flex-col glassmorphism'
			>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Your IA prompt
					</span>

					<textarea
						value={post.prompt}
						onChange={(e) =>
							setPost({
								...post,
								prompt: e.target.value,
							})
						}
						placeholder='Write your prompt here...'
						className='form_textarea'
						required
					/>
				</label>

				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Tag (products, development, education)
					</span>

					<input
						value={post.tag}
						onChange={(e) =>
							setPost({
								...post,
								tag: e.target.value,
							})
						}
						placeholder='#tag here...'
						className='form_input'
						required
					/>
				</label>

				<div className='flex-end mx-3 mb-5 gap-5'>
					<Link href='/' className='text-gray-500 text-sm'>
						Cancel
					</Link>

					<button
						type='submit'
						className={`${
							!submitting ? 'px-5' : 'px-8'
						} py-1.5 capitalize text-sm bg-primary-orange rounded-full hover:bg-orange-600 text-white`}
						disabled={submitting}
					>
						{!submitting ? (
							type
						) : (
							<Image src='/assets/icons/loader-white.svg' height={20} width={20} />
						)}
					</button>
				</div>
			</form>
		</section>
	);
}

export default Form;
