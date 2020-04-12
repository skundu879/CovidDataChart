import React from 'react';
import {Card,CardContent,Typography,Grid} from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cn from 'classnames'


const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate},country})=>{

    if(!confirmed){
        return 'loading.....'
    }
    //console.log(confirmed)
    return(
        <div className={styles.container}>
        <Grid container spacing={3} justify="center">
            <Grid item component={Card} xs={12} md={3} elevation={3} className={cn(styles.card,styles.Infected)}>
            <CardContent>
            <Typography color="textSecondary" variant="h4" gutterBottom className={styles.icolor}>Infected</Typography>
            <Typography variant="h5"><CountUp start={0} end={confirmed.value} duration={2.25} separator=","/></Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Numer of active cases for COVID-19 in <b>{country? country:'Globaly'}</b> </Typography>
            </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} elevation={3} className={cn(styles.card,styles.Recovered)}>
            <CardContent>
            <Typography color="textSecondary" variant="h4" gutterBottom className={styles.rcolor}>Recovered</Typography>
            <Typography variant="h5"><CountUp start={0} end={recovered.value} duration={2.25} separator=","/></Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Numer of recovered cases from COVID-19 in <b>{country? country:'Globaly'}</b></Typography>
            </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} elevation={3} className={cn(styles.card,styles.Deaths)}>
            <CardContent>
            <Typography color="textSecondary" variant="h4" gutterBottom className={styles.dcolor}>Deaths</Typography>
            <Typography variant="h5"><CountUp start={0} end={deaths.value} duration={2.25} separator=","/></Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Numer of deaths for COVID-19 in <b>{country? country:'Globaly'}</b></Typography>
            </CardContent>
            </Grid>
        </Grid>
        </div>
    )
}

export default Cards;