import React, { Component } from 'react';
import axios from 'axios';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Icon,
    withStyles
} from '@material-ui/core';

const useStyles = theme => ({
    media: {
        textAlign: 'center'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
});

class PlayerProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlines: null
        }
    }

    getHeadlineStats() {
        let player = this.props.player;

        axios.get('/data/headline-stats.json')
            .then(response => {
                let data = response.data.filter(x => x['PLAYER_ID'] === player['PERSON_ID'])[0];

                this.setState({
                    headlines: data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getHeadlineStats();
    }

    render() {
        let classes = this.props.classes;
        let player = this.props.player;
        let team = player['TEAM_CITY'] + ' ' + player['TEAM_NAME'];

        let headlines = <div></div>;

        if(this.state.headlines !== null){
            headlines = <ul>
                <li>
                    <b>Points:</b> {this.state.headlines['PTS']}
                </li>
                <li>
                    <b>Assists:</b> {this.state.headlines['AST']}
                </li>
                <li>
                    <b>Rebounds:</b> {this.state.headlines['REB']}
                </li>
                <li>
                    <b>PIE:</b> {this.state.headlines['PIE']}
                </li>
            </ul>;
        }

        return (
            <Card>
                <CardHeader
                    avatar={
                        <Avatar 
                            alt={team} 
                            src={'img/LOGO-' + player['TEAM_ABBREVIATION'] + '.svg'}  
                        />
                    }
                    title={player['DISPLAY_FIRST_LAST']}
                    subheader={team}
                />

                <CardMedia className={classes.media}>
                    <img
                        src={'img/' + player['PERSON_ID'].toString() + '.png'}
                    />
                </CardMedia>

                <CardContent>
                    {headlines}
                </CardContent>
            </Card>
        );
    }
}

export default (withStyles(useStyles)(PlayerProfileCard));