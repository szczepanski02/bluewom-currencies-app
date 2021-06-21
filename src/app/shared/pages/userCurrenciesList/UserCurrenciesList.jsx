import React from 'react'
import FavoriteCurrenciesList from '../../components/FavoriteCurrenciesList';
import AddFavoriteCurrency from '../../components/AddFavoriteCurrency';

import { Heading } from '@chakra-ui/layout';
import { Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Topbar from '../../layout/Topbar';

const UserCurrenciesList = () => {

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const styles = {
        currencies__headText: {
            fontSize: '26px',
        }
    }

    return (
        <div>
            <Topbar />
            <div className="container">
                <Grid container spacing={isSmall ? 0 : 3}>
                    <Grid item md={6} xs={12}>
                        <div style={styles.currencies__container} className="currencies__list">
                            <Heading fontSize="3xl" textAlign="center" textColor="#9c27b0" mb={10}>Currencies list</Heading>
                            <FavoriteCurrenciesList />
                        </div>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <AddFavoriteCurrency />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
export default UserCurrenciesList;