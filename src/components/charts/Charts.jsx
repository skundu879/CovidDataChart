import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../Api';
import {Line,Bar} from 'react-chartjs-2';

import styles from './Charts.module.css';

const Charts = ({data:{confirmed,recovered,deaths},country})=>{
    const [dailyData,setDailyData]= useState([]);

    useEffect(()=>{
        const fetchApi= async () => {
            setDailyData( await fetchDailyData());
        }
        fetchApi();
    },[]);

    const LineChart=(
        dailyData.length ? (<Line 
        data={{ 
            labels:dailyData.map(({date})=> date),
            datasets:[{
                data:dailyData.map(({confirmed})=>confirmed),
                label: 'Infected',
                fontStyle: 'bold',
                borderColor:'#3333ff',
                fill: true

            },
                {
                    data:dailyData.map(({deaths})=>deaths),
                    label: 'Deaths',
                    borderColor:'red',
                    fill: true,
                    backgroundColor:'rgba(255,0,0,0.5)'
                }
            ]
        }}
        />) :null
    )
//console.log(confirmed)
    const barChar= (
        confirmed ? (
            <Bar 
            data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    labels:'Infected People',
                    backgroundColor:[
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(51, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                    ],
                    data:[confirmed.value,recovered.value,deaths.value]

                }]

            }}
            options={{
                legend:{display:false},
                title:{display:true,text:`Curent situation in ${country}`}
            }}
            />
        ) : null
    )
    return(
        <div className={styles.container}>
        {country?barChar:LineChart} 
        </div>
    )
}

export default Charts;