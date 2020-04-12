import React from 'react';
import {Card,CardContent,Typography,Grid} from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cn from 'classnames'


const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate}})=>{

    if(!confirmed){
        return 'loading.....'
    }
    console.log(confirmed)
    return(
        <div className={styles.container}>
        <Grid container spacing={3} justify="center">
            <Grid item component={Card} xs={12} md={3} elevation={3} className={cn(styles.card,styles.Infected)}>
            <CardContent>
            <Typography color="textSecondary" gutterBottom>Infected</Typography>
            <Typography variant="h5"><CountUp start={0} end={confirmed.value} duration={5.25} separator=","/></Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Numer of active cases in COVID-19</Typography>
            </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} elevation={3} className={cn(styles.card,styles.Recovered)}>
            <CardContent>
            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
            <Typography variant="h5"><CountUp start={0} end={recovered.value} duration={5.25} separator=","/></Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Numer of recovered cases in COVID-19</Typography>
            </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} elevation={3} className={cn(styles.card,styles.Deaths)}>
            <CardContent>
            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
            <Typography variant="h5"><CountUp start={0} end={deaths.value} duration={5.25} separator=","/></Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Numer of deaths for COVID-19</Typography>
            </CardContent>
            </Grid>
        </Grid>
        </div>
    )
}

export default Cards;