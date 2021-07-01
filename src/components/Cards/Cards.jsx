import { Typography, Grid } from "@material-ui/core";
import CardComponent from "./Card/Card";
import styles from "./Cards.module.css";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getLastMonthsPatientsQuery = gql`
    {
        patients {
            DateAnnounced
            CurrentStatus
        }
    }
`;

const Info = (props) => {
    const {
        covidData: { confirmed, lastUpdate },
    } = props;
    if (!confirmed) {
        return "Loading...";
    }

    const data = props.data;
    if (data.loading) {
        return <div>Loading Patients...</div>;
    } else {
        const thisMonth = new Date().getMonth();
        let thisYear = new Date().getFullYear();
        let pastYear = new Date().getFullYear() - 1;
        var deceased = 0;
        var recovered = 0;
        var active = 0;
        var lastMonthDeceased = 0;
        var lastMonthRecovered = 0;
        var lastMonthActive = 0;
        data.patients.map((patient) => {
            if (
                (patient.DateAnnounced.split("/")[1] === "" + thisMonth &&
                    patient.DateAnnounced.split("/")[2] === "" + thisYear) ||
                (patient.DateAnnounced.split("/")[1] === "" + thisMonth &&
                    patient.DateAnnounced.split("/")[2] === "" + thisYear)
            ) {
                if (patient.CurrentStatus === "Recovered") {
                    recovered++;
                } else if (patient.CurrentStatus === "Deceased") {
                    deceased++;
                } else {
                    active++;
                }
            }
            if (
                (patient.DateAnnounced.split("/")[1] === "0" + thisMonth &&
                    patient.DateAnnounced.split("/")[2] === "" + thisYear) ||
                (patient.DateAnnounced.split("/")[1] === "0" + thisMonth &&
                    patient.DateAnnounced.split("/")[2] === "" + pastYear)
            ) {
                if (patient.CurrentStatus === "Recovered") {
                    lastMonthRecovered++;
                } else if (patient.CurrentStatus === "Deceased") {
                    lastMonthDeceased++;
                } else {
                    lastMonthActive++;
                }
            }
        });
    }

    return (
        <div className={styles.container}>
            <Typography gutterBottom variant="h4" component="h2">
                Global
            </Typography>
            <h1>This Month</h1>
            <Grid container spacing={3} justify="center">
                <CardComponent
                    className={styles.infected}
                    cardTitle="Active"
                    value={active}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of active cases from COVID-19."
                />
                <CardComponent
                    className={styles.recovered}
                    cardTitle="Recovered"
                    value={recovered}
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
            <h1>Last Month</h1>
            <Grid container spacing={3} justify="center">
                <CardComponent
                    className={styles.infected}
                    cardTitle="Active"
                    value={lastMonthActive}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of active cases from COVID-19."
                />
                <CardComponent
                    className={styles.recovered}
                    cardTitle="Recovered"
                    value={lastMonthRecovered}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of recoveries from COVID-19."
                />
                <CardComponent
                    className={styles.deaths}
                    cardTitle="Deaths"
                    value={lastMonthDeceased}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of deaths caused by COVID-19."
                />
            </Grid>
        </div>
    );
};

export default graphql(getLastMonthsPatientsQuery)(Info);
