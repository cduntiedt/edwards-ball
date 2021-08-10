import React from 'react';
import Indicator from '../charts/plotly/Indicator';
import PlayerCard from './PlayerCard';
import axios from 'axios';

class PlayerIndicatorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    loadIndicators(){
        let indicators = [];

        axios.get('/data/season-totals.json')
            .then(response => {
                let data = response.data;
                // let playerData = data.filter(x => x['PLAYER_ID'] === this.props.player['PERSON_ID']);
                // let compData = data.filter(x => x['PLAYER_ID'] === this.props.playerRef['PERSON_ID']);

                // for (let index = 0; index < fields.length; index++) {
                //     let field = fields[index];
                //     let indicator = {
                //         value: playerData[field],
                //         reference: compData[field]
                //     };

                //     indicators.push(indicator);
                // }

                let fields = this.props.fields;
                let indicators = fields.map(field => {
                    return {
                        value: data.filter(x => x['PLAYER_ID'] === this.props.player['PERSON_ID'])[0][field],
                        reference: data.filter(x => x['PLAYER_ID'] === this.props.playerRef['PERSON_ID'])[0][field]
                    };
                });

                console.log(indicators);

                this.setState({
                    indicators: indicators
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount(){
        // //resize the graph when the window size changes
        // window.addEventListener("resize", this.setLayout.bind(this));
        this.loadIndicators();
    }

    componentDidUpdate(prevProps){
        //if the props change, reload the chart
        if(prevProps !== this.props){
            //TODO: debounce
            setTimeout(() => {
                this.loadIndicators();
            },1000);
        }
    }

    render() { 
        if(this.state.indicators !== undefined){
            console.log(this.state.indicators);
            return ( 
                <PlayerCard player={this.props.player} subheader={this.props.subheader}>
                    {this.state.indicators.map(indicator => { 
                        return <Indicator value={indicator.value} reference={indicator.reference}/>
                    })}
                </PlayerCard>
            );
        }
        else{
            return (
                <div></div>
            )
        }
    }
}
 
export default PlayerIndicatorCard;