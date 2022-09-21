import {Redirect, Route} from "react-router-dom";
import {useEffect} from "react";

function PrivateRoute({component: Component, ...rest}) {

    useEffect(()=>{
        checkValidToken()
    },[])
    const checkValidToken = () => {
        const token = sessionStorage.getItem('token');
        const roles = sessionStorage.getItem('roles');
        if (null!=token) {
            const decodedJwt = parseJwt(token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                sessionStorage.clear('token')
                return false
            }
            return true
        } else {
            return false
        }
    }
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };
    return (
        <>
            {checkValidToken()
                ? <Route {...rest} render={props => <Component {...rest} {...props} />}/>
                : <Redirect to="/sign-in"/>
            }
        </>
    );
}

export default PrivateRoute