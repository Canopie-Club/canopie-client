export const parseSubdomain = (url: URL) => {
    // TODO: Extend logic to handle localhost more accurately as 
    // well as client custom domains
    const host = url.host;
	let subdomain = host.split('.')[0];
	let domain = host.split('.')[1];

    if (subdomain === 'www') {
        subdomain = '';
    }

    if (/localhost/.test(subdomain)) {
        subdomain = '';
        domain = 'canopie.club';
    }

    if (/localhost/.test(domain)) {
        domain = 'canopie.club';
    }

	return {subdomain, domain};
};