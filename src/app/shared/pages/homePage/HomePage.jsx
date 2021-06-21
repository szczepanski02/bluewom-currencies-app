import React, { useContext, useEffect, useState } from 'react'
import { UsersContext } from '../../../context/UsersContext';
import Topbar from '../../layout/Topbar';
import db from '../../../constants/config';
import { Heading } from '@chakra-ui/react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import './HomePage.scss';

import CurrenciesList from '../../components/CurrenciesList';
import MainChart from '../../components/MainChart';

const HomePage = () => {

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const styles = {
        currencies__headText: {
            fontSize: '26px',
        }
    }

    const { username } = useContext(UsersContext);
    const [ userExist, setUserExist ] = useState(false);

    const setNewUser = (id) => {

        const newUserObject = {
            name: username
        }
        db.ref(`users/${id}`).set(newUserObject);
        setUserExist(true);
    }

    useEffect(() => {
        db.ref('users').once('value', (snapshot) => {
            const data = snapshot.val();
            if(data.length > 0) {
                const findItem = data.map(e => e.name).indexOf(username);
                if(findItem >= 0) {
                    setUserExist(true);
                } else {
                    setNewUser(data.length);
                }
            } else return;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Topbar />
            {userExist ? 
                <div className="container">
                    <Grid container spacing={isSmall ? 0 : 3}>
                        <Grid item md={6} xs={12}>
                            <div style={styles.currencies__container} className="currencies__list">
                                <Heading fontSize="3xl" textAlign="center" textColor="#9c27b0" mb={10}>Currencies list</Heading>
                                <CurrenciesList />
                            </div>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <MainChart />
                        </Grid>
                    </Grid>
                </div>
            : null}
        </div>
    )
}
export default HomePage;