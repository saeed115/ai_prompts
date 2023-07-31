import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
	const promptId = params.id;

	try {
		await connectToDB();

		const prompt = await Prompt.findById(promptId).populate('creator');

		if (!prompt) return new Response('Prompt not found', { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response('Failed to load prompt place try again later', { status: 500 });
	}
};

export const PATCH = async (req, { params }) => {
	const promptId = params.id;
	const { prompt, tag } = await req.json();

	try {
		await connectToDB();

		const existingPrompt = await Prompt.findById(promptId).populate('creator');

		if (!existingPrompt) return new Response('Prompt not found', { status: 404 });

		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (error) {
		return new Response('Failed to update prompt place try again later', { status: 500 });
	}
};

export const DELETE = async (req, { params }) => {
	const promptId = params.id;

	try {
		await connectToDB();

		await Prompt.findByIdAndDelete(promptId);

		return new Response('prompt deleted successfully', { status: 201 });
	} catch (error) {
		return new Response('Failed to delete prompt place try again later', { status: 500 });
	}
};
