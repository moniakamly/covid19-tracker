import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api'; 
import {Line , Bar} from 'react-chartjs-2'; 
import styles from './Chart.module.css';

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]); 

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI(); 
    }, []);

    const lineData = {
        labels: dailyData.map(({ date }) => date), 
        datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true 
        }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true
        }],
    }

    const lineChart = ( dailyData.length ? (<Line data={lineData}/>) : null );

    const barData = {
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
            data: [confirmed?.value, recovered?.value, deaths?.value],
            label: 'People',
            backgroundColor: [
                'rgba(0, 0, 255, 0.5)',
                'rgba(0, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
            ]
        }]
    }

    const barOptions = {
        legend: { display: false},
        title: { display: true, text: `Current state in ${country}` },
    }
        

    const barChart = ( confirmed ? ( <Bar data={barData} options={barOptions}/> ) : null )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}


export default Chart;