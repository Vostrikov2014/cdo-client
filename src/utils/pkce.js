import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

export const generatePKCECode = () => {
    const randomString = (length = 43) =>
        Array.from(crypto.getRandomValues(new Uint8Array(length)))
            .map(byte => (byte % 36).toString(36))
            .join('');

    const codeVerifier = randomString();
    const codeChallenge = Base64.stringify(sha256(codeVerifier))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    localStorage.setItem('pkce_code_verifier', codeVerifier);
    return codeChallenge;
};
