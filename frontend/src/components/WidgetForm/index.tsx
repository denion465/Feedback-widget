import { useState } from 'react';

import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
	BUG: {
		title: 'Problema',
		image: {
			source: bugImageUrl,
			alt: 'Imagem de um inseto'
		}
	},
	IDEA: {
		title: 'Ideia',
		image: {
			source: ideaImageUrl,
			alt: 'Imagem de uma lâmpada',
		}
	},
	OTHER: {
		title: 'Outro',
		image: {
			source: thoughtImageUrl,
			alt: 'Imagem de um balão de pensamento',
		}
	}
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
	const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
	const [feedbacksend, setFeedbacksend] = useState(false);

	function handleRestartFeedback() {
		setFeedbacksend(false);
		setFeedbackType(null);
	}

	return (
		<div
			className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex
				flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto
			"
		>

			{feedbacksend ? (
				<FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
			) : (
				<>
					{!feedbackType ? (
						<FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
					) : (
						<FeedbackContentStep
							feedbackType={feedbackType}
							onFeedbackRestartRequested={handleRestartFeedback}
							onFeedbackSend={() => setFeedbacksend(true)}
						/>
					)}
				</>
			)}

			<footer className="text-xs text-neutral-400">
				Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
			</footer>
		</div>
	);
}
