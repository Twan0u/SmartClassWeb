let createTokenProvider = () => {
    let _token: { accessToken: string } =
        JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || '') || null;
    const getExpirationDate = (jwtToken?: string): number | null => {
        if (!jwtToken) {
            return null;
        }
        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
        // multiply by 1000 to convert seconds into milliseconds
        return jwt && jwt.exp && jwt.exp * 1000 || null;
    };
    const isExpired = (exp?: number) => {
        if (!exp) {
            return false;
        }
        return Date.now() > exp;
    };

    const getToken = async () => {
        if (!_token) {
            return null;
        }
        if (isExpired(getExpirationDate(_token.accessToken))) {
            return null;
        }
        return _token && _token.accessToken;
    };
    const isLoggedIn = () => {
        return !!_token;
    };
    const setToken = (token: typeof _token) => {
        if (token) {
            localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
        } else {
            localStorage.removeItem('REACT_TOKEN_AUTH');
        }
        _token = token;
    };

    return {
        getToken,
        isLoggedIn,
        setToken,
    };
};
export default createTokenProvider;