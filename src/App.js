import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { CovidCards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api/";
import styles from "./App.module.css";

import image from "./images/image.png";

// apollo client setup
const client = new ApolloClient({
    uri: "https://http://glacial-savannah-24805.herokuapp.com/graphql",
});

class App extends React.Component {
    state = {
        data: {},
        country: "",
    };

    async componentDidMount() {
        const data = await fetchData();

        this.setState({ data });
    }

    handleCountryChange = async (country) => {
        const data = await fetchData(country);

        this.setState({ data, country: country });
    };

    render() {
        const { data, country } = this.state;

        return (
            <ApolloProvider client={client}>
                <div className={styles.container}>
                    <img className={styles.image} src={image} alt="COVID-19" />
                    <CovidCards covidData={data} />
                    <CountryPicker
                        handleCountryChange={this.handleCountryChange}
                    />
                    <Chart covidData={data} country={country} />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
