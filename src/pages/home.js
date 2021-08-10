import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {
    Grid
} from '@material-ui/core';

//selectors
import { getStatCategory } from '../state/selectors/StatCategorySelector';
import { getPlayers } from '../state/selectors/PlayerSelector';

//thunks
import { loadPlayers } from '../state/thunks/PlayerThunks';

//componenets
import PlayerProfileCard from '../components/cards/PlayerProfileCard';
import ShotChart from '../components/charts/plotly/ShotChart';
import GrowthCompCard from '../components/cards/GrowthCompCard';
import PlayerCard from '../components/cards/PlayerCard';
//import PlayerStatsDonutCard from '../components/cards/PlayerStatsDonutCard';
import PlayerShotsDonutCard from '../components/cards/PlayerShotsDonutCard';
import PlayerIndicatorCard from '../components/cards/PlayerIndicatorCard';

class Home extends React.Component {
    gameData = [];

    constructor(props) {
        super(props);
        this.state = { }
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
                        <PlayerCard player={player} subheader={'Shot Detail'}>
                            {/* TODO: add game select */}
                            <ShotChart player={player}></ShotChart>
                        </PlayerCard>
                    </Grid>
                })}

                {this.props.players.map(player => {
                    return <Grid item xs={12} sm={12} md={6} key={player['PERSON_ID']}>
                        <PlayerShotsDonutCard 
                            player={player} 
                            subheader={'Shot Range'} 
                            item={'SHOT_ZONE_RANGE'}
                            fields={['Less Than 8 ft.', '8-16 ft.', '16-24 ft.', '24+ ft.']}
                        />
                    </Grid>
                })}

                {this.props.players.map(player => {
                    //filter the player being referenced
                    let playerRef = this.props.players.filter(p => p['PERSON_ID'] !== player['PERSON_ID'])[0];

                    return <Grid item xs={12} sm={12} md={6} key={player['PERSON_ID']}>
                        <PlayerIndicatorCard 
                            fields={['PTS', 'REB', 'AST', 'STL']}
                            player={player} 
                            playerRef={playerRef} 
                            subheader={'Stat Indicators'} 
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);