import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { 
    Grid,
    Card,
    CardContent
} from '@material-ui/core';
import LineChart from '../components/charts/plotly/LineChart';
import StatCategorySelect from '../components/selects/StatCategorySelect';
import { getStatCategory } from '../state/selectors/StatCategorySelector';
import ShotChart from '../components/charts/plotly/ShotChart';

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

        if (this.props.selectedCategory === undefined || this.props.selectedCategory === null) {
            chart = <div></div>;
        } else {
            chart = <LineChart 
                data={this.state.data} 
                x={'GAME_DATE'} 
                y={this.props.selectedCategory.id} 
                title={this.props.selectedCategory.text}/>;
        }

        return ( 
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <StatCategorySelect></StatCategorySelect>
                            {chart}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <ShotChart></ShotChart>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    selectedCategory: getStatCategory(state)
});

export default connect(mapStateToProps)(Home);