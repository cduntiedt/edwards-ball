import React from 'react';
import Indicator from '../charts/plotly/Indicator';
import PlayerCard from './PlayerCard';

class PlayerIndicatorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <PlayerCard player={this.props.player} subheader={this.props.subheader}>
                {/* <Indicator/> */}
            </PlayerCard>
        );
    }
}
 
export default PlayerIndicatorCard;