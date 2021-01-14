import createTokenProvider from './createTokenProvider';
import Data from './data';

export const createAuthProvider = () => {
    const tokenProvider = createTokenProvider();
    const data = Data();

    const login = (newToken) => {
        tokenProvider.setToken(newToken);
    };

    const logout = () => {
        tokenProvider.setToken(false);
    };

    const fetchHeaders = () => {
        const token = 'Bearer ' + tokenProvider.getToken();
        return new Headers({
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': token,
        })
    };
    const fetchApiURl = (path) => {
        return data.url() + path;
    };

    return {
        fetchApiURl,
        fetchHeaders,
        login,
        logout
    }
};
export default createAuthProvider();
