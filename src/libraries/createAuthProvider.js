import createTokenProvider from './createTokenProvider';
import Data from './data';

export const createAuthProvider = () => {
    const tokenProvider = createTokenProvider();
    const data = Data();

    const login = (newToken) => {
        tokenProvider.setToken(newToken);
    };

    const logout = () => {
        tokenProvider.setToken(null);
    };

    const fetchHeaders = () => {
        const token =  'Bearer ' + tokenProvider.getToken();
        return new Headers({
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': token,
        })
    };
    const fetchApiURl= (path)=> {
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

/*fetch('http://192.168.1.22:4000/login', {
    method :'post',
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }),
    mode: 'cors',
    body: JSON.stringify({
        "username" : "ant.lamb.al@gmail.com",
        "password" : "1234"
    })
})
    .then(response=> response.json())
    .then((responseJson)=>{
    console.log(responseJson)
    });*/