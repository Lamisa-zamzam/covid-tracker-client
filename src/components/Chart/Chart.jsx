import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const getPatientsQuery = gql`
    {
        patients {
            PatientNumber
            Nationality
            CurrentStatus
            DateAnnounced
        }
    }
`;

const Chart = (props) => {
    const {
        covidData: { confirmed, recovered, deaths },
        country,
    } = props;
    const [dailyData, setDailyData] = useState({});

    const displayPatients = () => {
        const data = props.data;
        if (data.loading) {
            return <div>Loading Patients...</div>;
        } else {
            console.log(data);
            return data.patients.map((patient) => {
                return (
                    <li key={patient.PatientNumber}>{patient.CurrentStatus}</li>
                );
            });
        }
    };

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialDailyData = await fetchDailyData();

            setDailyData(initialDailyData);
        };

        fetchMyAPI();
    }, []);

    const barChart = confirmed ? (
        <Bar
            data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "People",
                        backgroundColor: [
                            "rgba(0, 0, 255, 0.5)",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)",
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` },
            }}
        />
    ) : null;

    const lineChart = dailyData[0] ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) =>
                    new Date(date).toLocaleDateString()
                ),
                datasets: [
                    {
                        data: dailyData.map((data) => data.confirmed),
                        label: "Infected",
                        borderColor: "#3333ff",
                        fill: true,
                    },
                    {
                        data: dailyData.map((data) => data.deaths),
                        label: "Deaths",
                        borderColor: "red",
                        backgroundColor: "rgba(255, 0, 0, 0.5)",
                        fill: true,
                    },
                    {
                        data: dailyData.map((data) => data.recovered),
                        label: "Recovered",
                        borderColor: "green",
                        backgroundColor: "rgba(0, 255, 0, 0.5)",
                        fill: true,
                    },
                ],
            }}
        />
    ) : null;

    return (
        <>
            <div className={styles.container}>
                {country ? barChart : lineChart}
            </div>
            {displayPatients()}
        </>
    );
};

export default graphql(getPatientsQuery)(Chart);
