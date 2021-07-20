import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {
    Avatar, 
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
    withStyles
} from '@material-ui/core';

//componenets
import PlayerProfileCard from '../components/cards/PlayerProfileCard';
import ShotChart from '../components/charts/plotly/ShotChart';

//selectors
import { getStatCategory } from '../state/selectors/StatCategorySelector';
import { getPlayers } from '../state/selectors/PlayerSelector';

//thunks
import { loadPlayers } from '../state/thunks/PlayerThunks';
import GrowthCompCard from '../components/cards/GrowthCompCard';

const useStyles = theme => ({
    header:{
        color: 'white',
        background: "linear-gradient(90deg, rgb(12, 35, 64) 45%, rgb(29,17,96) 55%)"
    },
    avatar:{
        backgroundColor: 'white'
    }
});

class Home extends React.Component {
    gameData = [];

    constructor(props) {
        super(props);
        this.state = {  }
        this.props.startLoadingPlayers();
    }

    getGames(){
        let players = this.props.players;

        axios.get('/data/game-log.json')
            .then(response => {
                players.forEach(player => {
                    let playerID = player['PERSON_ID'];
                    let color = player['LINE_COLOR'];
        
                    let d = {
                        id: playerID,
                        color: color,
                        games: response.data.filter(x => x['Player_ID'] === playerID)
                    };
                    this.gameData.push(d);
        
                    this.setState({
                        data: this.gameData
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount(){
        this.getGames();
    }

    render() { 
        let classes = this.props.classes;
        let perModes = [ 'Per Game', 'Total' ];

        return ( 
            <Grid container spacing={1}>
                {/* player profile card */}
                {this.props.players.map(player => {
                    return <Grid item sm={12} md={6} key={player['PERSON_ID']} >
                        <PlayerProfileCard player={player} />
                    </Grid>
                })}

                {/* player shot detail card */}
                {this.props.players.map(player => {
                    return <Grid item xs={12} sm={12} md={6} key={player['PERSON_ID']} >
                        <Card>
                            <CardHeader
                                className={classes.header}
                                style={{
                                    background: player['PRIMARY_COLOR']
                                }}
                                avatar={
                                    <Avatar 
                                        className={classes.avatar}
                                        alt={player['DISPLAY_FIRST_LAST']} 
                                        src={'img/' + player['PERSON_ID'].toString() + '.png'}  
                                    />
                                }
                                title={
                                    <Typography 
                                        variant='h5'
                                    >
                                        {player['DISPLAY_FIRST_LAST']}
                                    </Typography>
                                }
                                subheader={
                                    <Typography 
                                        variant='body1'
                                    >
                                        Shot Detail
                                    </Typography>
                                }
                            />
                            <CardContent>
                                {/* TODO: add game select */}
                                <ShotChart player={player}></ShotChart>
                            </CardContent>
                        </Card>
                    </Grid>
                })}

                {/* player per mode growth comparison */}
                {perModes.map(perMode => {
                    return <Grid item xs={12} key={perMode}>
                        <GrowthCompCard data={this.state.data} perMode={perMode}/>
                    </Grid>
                })}
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    selectedCategory: getStatCategory(state),
    players: getPlayers(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingPlayers: () =>  dispatch(loadPlayers())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Home));