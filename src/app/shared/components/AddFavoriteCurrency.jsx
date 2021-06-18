import React from 'react'
import { FormControl, FormLabel, Input, Heading, Button } from '@chakra-ui/react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const AddFavoriteCurrency = () => {

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const styles = {
        error: {color: 'red'},
        button: {backgroundColor: '#9c27b0', color: 'white', paddingLeft: 40, paddingRight: 40}
    }

    return (
        <div>
            <Heading fontSize="2xl" textAlign="center" textColor="#9c27b0" mb={5} mt={isSmall ? 20 : 0}>Add favorite currency</Heading>
            <FormControl>
                <FormLabel>Type currency code</FormLabel>
                <Input type="text" name="currency" placeholder="currency"></Input>
                <Button type="submit" size="sm" mt={2} style={styles.button}>Add</Button>
            </FormControl>
        </div>
    )
}
export default AddFavoriteCurrency;