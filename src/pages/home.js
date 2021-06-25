import axios from 'axios';
import React from 'react';
import LineChart from '../components/charts/LineChart';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        axios.get('/data/1630162/game-log.json')
            .then(response => {
                this.setState({
                    data: response.data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() { 
        return ( 
            <div>
                <LineChart data={this.state.data} x={'GAME_DATE'} y={'PTS'}></LineChart>
            </div> 
        );
    }
}
 
export default Home;