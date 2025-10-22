import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	let searchParams = url.searchParams;
	let categorie = searchParams.get('categorie');
	let consigne = searchParams.get('consigne');
	let avecPhrase = searchParams.get('avecPhrase');

	return {
		categorie,
		consigne,
		avecPhrase
	};
};
