let createTokenProvider = () => {
    let token = localStorage.getItem('REACT_TOKEN_AUTH') || '';
    const getExpirationDate = (jwtToken) => {
        if (jwtToken === "" || jwtToken) {
            return null;
        }
        console.log(jwtToken);
        console.log(atob(jwtToken.split('.')[1]))
        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
        // multiply by 1000 to convert seconds into milliseconds
        return jwt.exp * 1000 || null;
    };
    const isExpired = (exp) => {
        if (!exp) {
            return false;
        }
        return Date.now() > exp;
    };

    const getToken = () => {
        if (!token) {
            return null;
        }
        if (isExpired(getExpirationDate(token))) {
            return null;
        }
        return token;
    };
    const isLoggedIn = () => {
        return !!token;
    };
    const setToken = (newtoken) => {
        if (newtoken) {
            localStorage.setItem('REACT_TOKEN_AUTH', newtoken);
        } else {
            localStorage.removeItem('REACT_TOKEN_AUTH');
        }
        token = newtoken;
    };
    return {
        getToken,
        isLoggedIn,
        setToken,
    };
};
export default createTokenProvider;