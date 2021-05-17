import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css'; 
import { fetchData } from './api'; 
import coronaImage from './images/covid19.png';

class App extends React.Component {
    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData(); 

        this.setState({data: fetchedData})
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country); 

        this.setState({data: fetchedData, country: country})
    }
    render() {

        const { data, country } = this.state; 
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="covid19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <div onChange="">
                    <input defaultChecked type="radio" value="" /> Line Chart
                    <input type="radio" value="" /> Bar Chart
                    <input type="radio" value="" /> Pie Chart
                    <input type="radio" value="" /> Table
                </div>
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App; 