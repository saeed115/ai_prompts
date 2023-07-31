'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

function PromptCard({ prompt, handelTagClick, handelEdit, handelDelete }) {
	const [copied, setCopied] = useState('');
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const handelCopy = () => {
		setCopied(prompt.prompt);

		navigator.clipboard.writeText(prompt.prompt);

		setTimeout(() => setCopied(''), 3000);
	};

	return (
		<div className='prompt_card'>
			<div className='flex justify-between gap-5'>
				<div
					onClick={() =>
						router.push(`/profile/${prompt.creator._id}/${prompt.creator.username}`)
					}
					className='flex flex-1 justify-start items-center cursor-pointer gap-3'
				>
					<Image
						src={prompt.creator.image}
						width={40}
						height={40}
						className='rounded-full object-contain'
						alt='user_mage'
					/>
					<div className='flex flex-col'>
						<h3 className='font-satoshi font-semibold text-gray-900'>
							{prompt.creator.username}
						</h3>
						<p className='font-inter text-sm text-gray-500'>{prompt.creator.email}</p>
					</div>
				</div>

				<div className='copy_btn relative' onClick={handelCopy}>
					{copied && <p className='absolute -top-5 px-4'>copied</p>}
					<Image
						src={
							copied === prompt.prompt
								? '/assets/icons/tick.svg'
								: '/assets/icons/copy.svg'
						}
						width={12}
						height={12}
					/>
				</div>
			</div>

			<p className='font-satoshi text-sm my-4 text-gray-700'>{prompt.prompt}</p>
			<p
				onClick={() => handelTagClick && handelTagClick(prompt.tag)}
				className='font-inter cursor-pointer text-sm orange_gradient'
			>
				#{prompt.tag}
			</p>
			{session?.user.id === prompt.creator._id && pathName === '/profile' && (
				<div className='flex justify-end border-t border-t-gray-200 pt-4 mt-4 gap-4'>
					<p
						onClick={handelEdit}
						className='text-sm font-inter cursor-pointer green_gradient'
					>
						Edit
					</p>
					<p
						onClick={handelDelete}
						className='text-sm font-inter cursor-pointer orange_gradient'
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
}

export default PromptCard;
