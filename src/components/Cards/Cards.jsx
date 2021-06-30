import { Typography, Grid } from "@material-ui/core";
import CardComponent from "./Card/Card";
import styles from "./Cards.module.css";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { useState } from "react";

const getPatientsQuery = gql`
    {
        statusWiseCases(CurrentStatus: "Deceased") {
            CurrentStatus
        }
    }
`;

const Info = (props) => {
    const {
        covidData: { confirmed, recovered, deaths, lastUpdate },
    } = props;
    if (!confirmed) {
        return "Loading...";
    }

    const data = props.data;
    if (data.loading) {
        return <div>Loading Patients...</div>;
    } else {
        console.log(data)
        var deceased = data.statusWiseCases.length;
    }

    return (
        <div className={styles.container}>
            <Typography gutterBottom variant="h4" component="h2">
                Global
            </Typography>
            <Grid container spacing={3} justify="center">
                <CardComponent
                    className={styles.infected}
                    cardTitle="Infected"
                    value={confirmed.value}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of active cases from COVID-19."
                />
                <CardComponent
                    className={styles.recovered}
                    cardTitle="Recovered"
                    value={recovered.value}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of recoveries from COVID-19."
                />
                <CardComponent
                    className={styles.deaths}
                    cardTitle="Deaths"
                    value={deceased}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of deaths caused by COVID-19."
                />
            </Grid>
        </div>
    );
};

export default graphql(getPatientsQuery)(Info);
