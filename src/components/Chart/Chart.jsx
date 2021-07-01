// import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

// import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

const getPatientsQuery = gql`
    {
        patients {
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
    // const [setDailyData] = useState({});

    // useEffect(() => {
    //     const fetchMyAPI = async () => {
    //         const initialDailyData = await fetchDailyData();

    //         setDailyData(initialDailyData);
    //     };

    //     fetchMyAPI();
    // }, []);

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

    // const lineChart = dailyData[0] ? (
    //     <Line
    //         data={{
    //             labels: dailyData.map(({ date }) =>
    //                 new Date(date).toLocaleDateString()
    //             ),
    //             datasets: [
    //                 {
    //                     data: dailyData.map((data) => data.confirmed),
    //                     label: "Infected",
    //                     borderColor: "#3333ff",
    //                     fill: true,
    //                 },
    //                 {
    //                     data: dailyData.map((data) => data.deaths),
    //                     label: "Deaths",
    //                     borderColor: "red",
    //                     backgroundColor: "rgba(255, 0, 0, 0.5)",
    //                     fill: true,
    //                 },
    //                 {
    //                     data: dailyData.map((data) => data.recovered),
    //                     label: "Recovered",
    //                     borderColor: "green",
    //                     backgroundColor: "rgba(0, 255, 0, 0.5)",
    //                     fill: true,
    //                 },
    //             ],
    //         }}
    //     />
    // ) : null;

    const handleDateChange = async (e) => {
        // const date = e.target.value;
        // const dbDate = date.split("-").reverse().join("/");
        // const { data } = await client.query({
        //     query: getPatientsQuery,
        //     variables: { DateAnnounced: dbDate },
        // });
        // console.log(data);
    };

    return (
        <>
            <input type="date" name="" id="" onChange={handleDateChange} />
            <div className={styles.container}>{country && barChart}</div>
        </>
    );
};

export default graphql(getPatientsQuery)(Chart);
