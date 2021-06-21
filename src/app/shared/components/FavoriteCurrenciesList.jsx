import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import db from '../../constants/config';
import { UsersContext } from '../../context/UsersContext';

const FavoriteCurrenciesList = () => {

    const [dataGrid, setDataGrid] = useState([]);
    const { username } = useContext(UsersContext);

    const columns = [
        { field: 'id', headerName: 'NR'},
        { field: 'code', headerName: 'CODE' },
    ]

    const setItem = (data) => {
        if(data) {
            const array = data.map((code, id) => (
                {id, code}
            ));
            setDataGrid(array);
        }
    }

    useEffect(() => {
        db.ref('users').on('value', (snapshot) => {
            const data = snapshot.val();
            const indexOfUser = data.map(e => e.name).indexOf(username);
            setItem(data[indexOfUser].favoriteCurrencies);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {dataGrid.length > 0 ? <div className="MuiDataGrid-mainGridContainer" style={{ height: '50vh'}}>
                <DataGrid rows={dataGrid} columns={columns} pageSize={100}/>
            </div> : <p>List is empty</p>}
        </div>
    )
}
export default FavoriteCurrenciesList;
