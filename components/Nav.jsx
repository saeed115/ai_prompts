'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';

function Nav() {
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	const { data: session } = useSession();

	const closeDropdown = () => setToggleDropdown(false);

	useEffect(() => {
		const getAuthProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};

		getAuthProviders();
	}, []);

	return (
		<nav className='w-full flex-between mb-16 pt-6'>
			<Link href='/' className='flex flex-center gap-2'>
				<Image
					src='/assets/images/logo.svg'
					width='40'
					height='40'
					alt='Promptopia logo'
					className='object-contain'
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>

			<div className='flex gap-3 md:gap-5'>
				<ThemeSwitcher />

				{/* Desktop nav */}
				<div className='sm:flex hidden'>
					{session?.user ? (
						<div className='flex gap-3 md:gap-5'>
							<Link href='/create-prompt' className='black_btn'>
								Create prompt
							</Link>

							<button type='button' className='outline_btn' onClick={signOut}>
								Sing out
							</button>

							<Link href='/profile'>
								<Image
									src={session?.user?.image}
									className='cursor-pointer rounded-full'
									width={37}
									height={37}
									alt='profile'
								/>
							</Link>
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map((provider) => (
									<button
										onClick={() => signIn(provider.id)}
										type='button'
										key={provider.name}
										className='black_btn'
									>
										Sing In with {provider.name}
									</button>
								))}
						</>
					)}
				</div>

				{/* Mobile nav */}

				<div className='sm:hidden flex relative'>
					{session?.user ? (
						<div className='flex'>
							<Image
								src={session?.user?.image}
								width={37}
								height={37}
								alt='profile'
								className='cursor-pointer rounded-full'
								onClick={() => setToggleDropdown((prev) => !prev)}
							/>

							{toggleDropdown && (
								<div className='dropdown'>
									<Link
										href='/profile'
										className='dropdown_link'
										onClick={closeDropdown}
									>
										My Profile
									</Link>
									<Link
										href='/create-prompt'
										className='dropdown_link'
										onClick={closeDropdown}
									>
										Create Post
									</Link>

									<button
										type='button'
										onClick={closeDropdown}
										className='black_btn w-full mt-5'
									>
										Sing out
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map((provider) => (
									<button
										onClick={() => signIn(provider.id)}
										type='button'
										key={provider.name}
										className='black_btn'
									>
										Sing In
									</button>
								))}
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Nav;
