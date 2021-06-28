import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import LineChart from '../components/charts/plotly/LineChart';
import StatCategorySelect from '../components/selects/StatCategorySelect';
import { getStatCategory } from '../state/selectors/StatCategorySelector';

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
        let chart;

        if (this.props.selectedCategory === undefined) {
            chart = <div></div>;
        } else {
            chart = <LineChart 
                data={this.state.data} x={'GAME_DATE'} 
                y={this.props.selectedCategory.id} 
                title={this.props.selectedCategory.text}/>;
        }

        return ( 
            <div>
                <StatCategorySelect></StatCategorySelect>
                {chart}
            </div> 
        );
    }
}

const mapStateToProps = state => ({
    selectedCategory: getStatCategory(state)
});

export default connect(mapStateToProps)(Home);