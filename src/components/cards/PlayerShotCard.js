import React from 'react';
import ShotChart from '../charts/plotly/ShotChart';
import PlayerGameSelect from '../selects/PlayerGameSelect';
import PlayerCard from './PlayerCard';

class PlayerShotCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let player = this.props.player;

        return ( 
            <PlayerCard player={player} subheader={'Shot Detail'}>
                <PlayerGameSelect player={player['PERSON_ID']} />

                <ShotChart player={player} />
            </PlayerCard>
         );
    }
}
 
export default PlayerShotCard;