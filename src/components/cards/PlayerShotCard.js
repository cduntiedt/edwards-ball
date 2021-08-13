import React from 'react';
import ShotChart from '../charts/plotly/ShotChart';
import PlayerGameSelect from '../selects/PlayerGameSelect';
import PlayerCard from './PlayerCard';

class PlayerShotCard extends React.Component {
    constructor(props) {
        super(props);
        this.gameHandler = this.gameHandler.bind(this);
        this.state = { 
            game: null
        }
    }

    gameHandler(value){
        this.setState({
            game: value
        });
    }

    render() { 
        let player = this.props.player;
        let game = this.state.game;

        return ( 
            <PlayerCard player={player} subheader={'Shot Detail'}>
                <PlayerGameSelect 
                    player={player} 
                    handleChange={this.gameHandler}
                />

                <ShotChart 
                    player={player} 
                    game={game}
                />
            </PlayerCard>
         );
    }
}
 
export default PlayerShotCard;