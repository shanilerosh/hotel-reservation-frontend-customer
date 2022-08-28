import {Redirect, Route} from "react-router-dom";

function PrivateRoute({component: Component, ...rest}) {

    const checkValidToken = () => {
        const token = sessionStorage.getItem('token');
        console.log(token);
        if (token) {
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