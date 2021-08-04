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

class PlayerShotsDonutCard extends React.Component {
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

        axios.get('/data/shot-chart-detail.json')
            .then(response => {
                let data = response.data.filter(x => x['PLAYER_ID'] === player['PERSON_ID']);

                let shots = {};

                let fields = this.props.fields;
                for (let index = 0; index < fields.length; index++) {
                    const field = fields[index];
                    shots[field] = data.filter(x => x[this.props.item] == field).length;
                }

                console.log(shots);

                this.setState({
                    data: shots
                });
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
 
export default (withStyles(useStyles)(PlayerShotsDonutCard));