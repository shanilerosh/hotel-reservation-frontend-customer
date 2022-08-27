import {Redirect, Route} from "react-router-dom";

function PrivateRoute({component: Component, ...rest}) {

    const checkValidToken = () => {
        const token = sessionStorage.getItem('token');
        console.log(token);
        if (token) {
            return true
        } else {
            return false
        }
    }

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