import React, { useState, useEffect, useContext } from 'react'
import { FormControl, FormLabel, Input, Heading, Button } from '@chakra-ui/react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { UsersContext } from '../../context/UsersContext';
import db from '../../constants/config';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const AddFavoriteCurrency = () => {

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const styles = {
        errorMessage: {color: 'red'},
        successMessage: {color: 'green'},
        button: {backgroundColor: '#9c27b0', color: 'white', paddingLeft: 40, paddingRight: 40}
    }

    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [favoriteCurrenciesList, setFavoriteCurrenciesList] = useState([]);
    const [userIndex, setUserIndex] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [exitingItemPos ,setExitingItemPos] = useState(undefined);
    const { username } = useContext(UsersContext);
    const inputChangeHandler = e => setInputValue(e.target.value);

    useEffect(() => {
        db.ref('users').on('value', (snapshot) => {
            const data = snapshot.val();
            const indexOfUser = data.map(e => e.name).indexOf(username);
            setUserIndex(indexOfUser);
            setFavoriteCurrenciesList(data[indexOfUser].favoriteCurrencies);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addClickHandler = () => {
        if(inputValue.length === 3) {
            if(favoriteCurrenciesList) {
                const isExist = favoriteCurrenciesList.indexOf(inputValue);
                if(isExist >= 0) {
                    setErrorMessage('You cant add this currency, becouse its exist on your list');
                    setSuccessMessage('');
                } else {
                    const newCurrency = inputValue.toUpperCase();
                        db.ref(`users/${userIndex}`).set({
                            name: username,
                            favoriteCurrencies: [...favoriteCurrenciesList, newCurrency]
                        });
                    setErrorMessage('');
                    setSuccessMessage('Currency has been added');
                }
            }
            else {
                const newCurrency = inputValue.toUpperCase();
                db.ref(`users/${userIndex}`).set({
                    name: username,
                    favoriteCurrencies: [newCurrency]
                });
                setErrorMessage('');
                setSuccessMessage('Currency has been added');
            }
        } else {
            setErrorMessage('Type a correct currency code!');
            setSuccessMessage('');
        }
    }
    
    const removeClickHandler = () => {

        if(inputValue.length === 3) {
            const isExist = favoriteCurrenciesList.indexOf(inputValue);
            if(isExist >= 0) {
                setExitingItemPos(isExist);
                setOpen(true);
            }
        } else {
            setErrorMessage('Type a correct currency code!');
            setSuccessMessage('');
        }
    }

    const handleRemoveItem = () => {
        let newArray = [...favoriteCurrenciesList];
        newArray.splice(exitingItemPos, 1);
        db.ref(`users/${userIndex}/favoriteCurrencies`).set([...newArray]);
        setErrorMessage('');
        setInputValue('');
        setSuccessMessage('Currency has been removed');
        setOpen(false);
    };
    
      const handleClose = () => {
        setInputValue('')
        setOpen(false);
    };


    return (
        <div>
            <Heading fontSize="2xl" textAlign="center" textColor="#9c27b0" mb={5} mt={isSmall ? 20 : 0}>Actions</Heading>
            <FormControl mb={4}>
                <FormLabel>Type currency code</FormLabel>
                <Input type="text" name="currency" value={inputValue} onChange={inputChangeHandler} placeholder="code"></Input>
                <Button type="submit" onClick={addClickHandler} size="sm" mt={2} style={styles.button}>Add</Button>
                <Button type="submit" onClick={removeClickHandler} size="sm" mt={2} ml={5} style={styles.button}>Remove</Button>
            </FormControl>
            {errorMessage.length > 0 ? <p style={styles.errorMessage}>{errorMessage}</p> : null}
            {successMessage.length > 0 ? <p style={styles.successMessage}>{successMessage}</p> : null}

            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Removing currency"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are trying to remove {inputValue} from your currencies list.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleRemoveItem} autoFocus>
                        Remove
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
export default AddFavoriteCurrency;