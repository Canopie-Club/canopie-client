export const parseSubdomain = (url: URL) => {
    // TODO: Extend logic to handle localhost more accurately as 
    // well as client custom domains
    let { hostname } = url;
    
    // Handle localhost and its subdomains
    if (hostname.endsWith('.localhost') || hostname === 'localhost') {
        // Replace .localhost with .canopie.club
        hostname = hostname.replace(/\.?localhost$/, '.canopie.club');
    }

    const parts = hostname.match(/^(?:([^.]+)\.)?([^.]+\.[^.]+)$/);
    
    if (!parts) {
        // Handle cases like 'example.com' or IP addresses

        throw new Error('Invalid hostname format');
    }

    let [, subdomain = '', domain] = parts;
    if (subdomain === 'www') subdomain = '';

	return {subdomain, domain};
};