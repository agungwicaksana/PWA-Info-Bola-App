export default function urlRplc(url) {
    if(url.slice(0,5) === 'http:') {
        return url.replace(/^http:\/\//i, 'https://');
    } else {
        return url;
    };
};