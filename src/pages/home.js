import axios from 'axios';
import React from 'react';
import LineChart from '../components/charts/plotly/LineChart';

class Home extends React.Component {
    gameData = [];

    constructor(props) {
        super(props);
        this.state = {  }
    }

    getGames(playerID, color){
        //edwards game logs
        axios.get('/data/' + playerID +  '/game-log.json')
        .then(response => {
            let d = {
                id: playerID,
                color: color,
                games: response.data
            };
            this.gameData.push(d);

            this.setState({
                data: this.gameData
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        this.getGames('1630162', '#78BE20');
        this.getGames('1630163', '#00788C');
    }

    render() { 
        return ( 
            <div>
                <LineChart data={this.state.data} x={'GAME_DATE'} y={'PTS'} title={'Points'}></LineChart>
                <LineChart data={this.state.data} x={'GAME_DATE'} y={'REB'} title={'Rebounds'}></LineChart>
                <LineChart data={this.state.data} x={'GAME_DATE'} y={'AST'} title={'Assists'}></LineChart>
                <LineChart data={this.state.data} x={'GAME_DATE'} y={'STL'} title={'Steals'}></LineChart>
                <LineChart data={this.state.data} x={'GAME_DATE'} y={'BLK'} title={'Blocks'}></LineChart>
            </div> 
        );
    }
}
 
export default Home;