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
import LineChart from '../components/charts/plotly/LineChart';
import StatCategorySelect from '../components/selects/StatCategorySelect';

//selectors
import { getStatCategory } from '../state/selectors/StatCategorySelector';
import { getPlayers } from '../state/selectors/PlayerSelector';

//thunks
import { loadPlayers } from '../state/thunks/PlayerThunks';

const useStyles = theme => ({
    header:{
        color: 'white'
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

        //load chart if a category is selected
        let chart = <div></div>;
        if (this.props.selectedCategory !== undefined && this.props.selectedCategory !== null) {
            chart = <LineChart 
                data={this.state.data} 
                x={'GAME_DATE'} 
                y={this.props.selectedCategory.id} 
                title={this.props.selectedCategory.text}/>;
        }

        return ( 
            <Grid container spacing={1}>
                {this.props.players.map(player => {
                    return <Grid item sm={12} md={6} key={player['PERSON_ID']} >
                        <PlayerProfileCard player={player} />
                    </Grid>
                })}

                {this.props.players.map(player => {
                    return <Grid item xs={12} sm={12} md={6} key={player['PERSON_ID']} >
                        <Card>
                            <CardHeader
                                style={{
                                    backgroundColor: player['PRIMARY_COLOR']
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
                                        className={classes.header}
                                    >
                                        {player['DISPLAY_FIRST_LAST']}
                                    </Typography>
                                }
                                subheader={
                                    <Typography 
                                        variant='body1'
                                        className={classes.header}
                                    >
                                        Shot Detail
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <ShotChart player={player}></ShotChart>
                            </CardContent>
                        </Card>
                    </Grid>
                })}

                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title='Per Game Growth Comparison'
                        />
                        <CardContent>
                            <StatCategorySelect></StatCategorySelect>
                            {chart}
                        </CardContent>
                    </Card>
                </Grid>
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