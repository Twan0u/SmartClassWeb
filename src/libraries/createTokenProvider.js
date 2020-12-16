let createTokenProvider = () => {
    /*let _token: { accessToken: string } = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || '') || null;*/
    //const getExpirationDate = (jwtToken?: string): number | null => {
        /*if (!jwtToken) {
            return null;
        }
        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
        // multiply by 1000 to convert seconds into milliseconds
        return jwt.exp * 1000 || null;*/
    //};
   /* const isExpired = (exp?: number) => {
        if (!exp) {
            return false;
        }
        return Date.now() > exp;
    };*/

    const getToken = () => {
        /*if (!_token) {
            return null;
        }
        if (isExpired(getExpirationDate(_token.accessToken))) {
            return null;
        }
        return _token || _token.accessToken;*/
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQW50b2luZSIsImxhc3RuYW1lIjoiTGFtYmVydCIsImxvZ2luIjoiYW50LmxhbWIuYWxAZ21haWwuY29tIiwiaWRjbGFzcyI6MSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE2MDgxMzM5MzIsImV4cCI6MTYwODIyMDMzMn0.9sRvZLvqeRy8_7PBRjoZ_yxpQVXYFhOTztJnkJ5FCLM'
    };
    /*const isLoggedIn = () => {
        return !!_token;
    };*/
    const isLoggedIn = () =>{};
    const setToken = (token) =>{};
    /*const setToken = (token: typeof _token) => {
        if (token) {
            localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
        } else {
            localStorage.removeItem('REACT_TOKEN_AUTH');
        }
        _token = token;
    };*/
    return {
        getToken,
        isLoggedIn,
        setToken,
    };
};
export default createTokenProvider;