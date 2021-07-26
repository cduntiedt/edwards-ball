import React from 'react';
import axios from 'axios';
import {
    withStyles
} from '@material-ui/core';
import DonutChart from '../charts/plotly/DonutChart';
import PlayerCard from './PlayerCard';

const useStyles = theme => ({
    header:{
        color: 'white',
        background: "linear-gradient(90deg, rgb(12, 35, 64) 45%, rgb(29,17,96) 55%)"
    },
    avatar:{
        backgroundColor: 'white'
    }
});

class PlayerStatsDonutCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: {},
            image: null
         }
    }

    getSeasonTotals() {
        let player = this.props.player;

        this.setState({
            image: "/img/" + player['PERSON_ID'] + '.png'
        });

        axios.get('/data/season-totals.json')
            .then(response => {
                let data = response.data.filter(x => x['PLAYER_ID'] === player['PERSON_ID'])[0];

                this.setState({
                    data: data
                });

                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount(){

        this.getSeasonTotals();
    }

    render() { 


        return ( 
            <PlayerCard player={this.props.player} subheader={this.props.subheader}>
                <DonutChart 
                    data={this.state.data}
                    fields={this.props.fields}
                    image={this.state.image}
                />
            </PlayerCard>
        );
    }
}
 
export default (withStyles(useStyles)(PlayerStatsDonutCard));