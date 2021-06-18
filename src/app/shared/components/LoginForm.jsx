import React, { useContext, useState } from 'react'
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { UsersContext } from '../../context/UsersContext';
import { Redirect } from 'react-router-dom';

const LoginForm = () => {

    const styles = {
        error: {color: 'red', fontSize: '14'},
        button: {backgroundColor: '#9c27b0', color: 'white'}
    }

    const { isUserLogged ,toggleLoggedState, setUsername } = useContext(UsersContext);
    const [usernameValidateMessage, setUsernameValidateMessage] = useState('');
    

    const handleSubmit = e => {
        e.preventDefault();
        const { username } = e.target.elements;

        if(username.value.length >= 3 && username.value.indexOf(' ') === -1) {
            setUsernameValidateMessage('');
            setUsername(username.value);
            toggleLoggedState(true);
            <Redirect to="/homePage" />
        } else {
            setUsernameValidateMessage('Username must be longer than 3 chars.');
            return;
        }
    }

    return (
        <div>
            {isUserLogged ? <Redirect push to="/homePage" /> : 
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" name="username" placeholder="username"></Input>
                        </FormControl>
                        <Button type="submit" style={styles.button}>Login</Button>
                        {usernameValidateMessage.length > 0 ? <p style={styles.error}>{usernameValidateMessage}</p> : null}
                    </Stack>
                </form>
            }
        </div>
    )
}

export default LoginForm;