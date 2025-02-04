import { useContext, useState } from 'react';
import { AuthContext } from '../store/auth-context';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverLay from '../components/UI/LoadingOverlay';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';

function SignupScreen() {
    const [isAuthenticating, setIsAuthentiated] = useState(false);

    const authCtx = useContext(AuthContext);

    async function signupHandler({ email, password }) {
        setIsAuthentiated(true);
        try {
            const token = await createUser(email, password);
            authCtx.authenticate(token);
        } catch (error) {
            Alert.alert('Authentication failed!',
                'Could not create user, Please check your input and try again later.'
            );
            setIsAuthentiated(false);
        }


    }

    if (isAuthenticating) {
        return <LoadingOverLay message="Creating User..." />
    }

    return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;