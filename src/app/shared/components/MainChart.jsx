import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Heading } from '@chakra-ui/react';

const MainChart = () => {

    const [api, setAPI] = useState([]);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'mid',
                data: [],
                backgroundColor: 'rgb(20, 141, 255)',
                borderColor: 'rgb(133, 196, 255)',
            }
        ]
    });

    useEffect(() => {
        if(api.length < 1) {
            fetch('http://api.nbp.pl/api/cenyzlota/last/7/?format=json')
                .then(res => res.json())
                .then(data => {
                    setAPI(data)
                })
                .catch(err => console.log(err));
        }
    });

    if(api.length > 1 && chartData.labels.length < 1) {
        
        const dateListFromApi = api.map(el => (
            el.data
        ));
        const valueListFromApi = api.map(el => (
            el.cena
        ));
        setChartData({
            labels: dateListFromApi,
            datasets: [
                {
                    label: 'mid',
                    data: valueListFromApi
                }
            ]
        });
    }

    return (
        <div className="goldChart" style={{marginTop: 50}}>
            <Heading fontSize="xl" mb={5}>The last 7 quotations of <span style={{color: '#9c27b0'}}>gold prices</span></Heading>

            <Line
                type={Line}
                data={chartData}
            />
        </div>
    );
}
export default MainChart;