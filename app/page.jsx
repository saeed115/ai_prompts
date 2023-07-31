import Feed from '@components/Feed';

export default function Home() {
	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='head_text text-center'>
				Discover & shear
				<br className='min-md:hidden' />
				<span className='orange_gradient text-center'>AI-Powered prompts</span>
			</h1>
			<p className='desc text-center'>
				Promptopia is an open-source AI prompting tool for modern to discover, share
				creative prompt
			</p>

			<Feed />
		</section>
	);
}
