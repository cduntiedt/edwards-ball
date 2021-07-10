import React from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import { getPlayers } from '../../../state/selectors/PlayerSelector';
import { loadPlayers } from '../../../state/thunks/PlayerThunks';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            layout: {
                title: props.title
            },
            config: {
                responsive: true
            },
            height: (typeof this.props.height === "undefined") ? "450px" : this.props.height
        }

        this.loadChart = this.loadChart.bind(this);
        this.props.startLoadingPlayers();
    }

    convertDate(dt){
        if(Object.prototype.toString.call(dt) === '[object Date]'){
            return dt;
        }

        let parts = dt.split(" ");

        //convert month
        switch (parts[0]) {
            case "JAN":
                parts[0] = 0;
                break;
            case "FEB":
                parts[0] = 1;
                break;
            case "MAR":
                parts[0] = 2;
                break;
            case "APR":
                parts[0] = 3;
                break;
            case "MAY":
                parts[0] = 4;
                break;
            case "JUN":
                parts[0] = 5;
                break;
            case "JUL":
                parts[0] = 6;
                break;
            case "AUG":
                parts[0] = 7;
                break;
            case "SEP":
                parts[0] = 8;
                break;
            case "OCT":
                parts[0] = 9;
                break;
            case "NOV":
                parts[0] = 10;
                break;
            case "DEC":
                parts[0] = 11;
            default:
                break;
        }

        //convert the day
        parts[1] = parseInt(parts[1].replace(',',''));
        //convert the year
        parts[2] = parseInt(parts[2]);

        let d = new Date(parts[2], parts[0], parts[1]); 
        return d;
    }

    componentDidMount(){
        this.loadChart();
    }

    componentDidUpdate(prevProps){
        //if the props change, reload the chart
        if(prevProps !== this.props){
            //TODO: debounce
            setTimeout(() => {
                this.loadChart();
            },1000);
        }
    }

    loadChart(){
        const x = this.props.x;
        const y = this.props.y;
        const data = this.props.data;
        const title = this.props.title;
        const players = this.props.players;

        //update chart data
        if(data !== undefined){
            let traces = [];

            data.forEach(player => {
                let sum = 0;
                
                let sortedData = player.games.sort((a,b)=> { return this.convertDate(a[x]) - this.convertDate(b[x]) });

                // //need to use array of arrays for custom data
                // var arrayData = sortedData.map(function(obj) {
                //     return Object.keys(obj).sort().map(function(key) { 
                //       return obj[key];
                //     });
                //   });


                let trace = {
                    name: players.filter(p => p['PERSON_ID'].toString() === player.id)[0]['DISPLAY_FIRST_LAST'],
                    x: sortedData.map(game => this.convertDate(game[x])),
                    y: sortedData.map((game, i) => { 
                        sum += game[y];
                        let gameIndex = i + 1;
                        return sum / gameIndex; 
                    }),
                    text: sortedData.map(game => game[y]),
                    customdata: sortedData.map(game => game["MATCHUP"]),
                    mode: 'lines',
                    line: {
                        color: player.color
                    },
                    hovertemplate: 
                        "<b>Date:</b> %{x}<br>" +
                        "<b>Matchup:</b> %{customdata}<br>" +
                        "<b>" + this.props.title + ":</b> %{text}<br>" +
                        "<b>Average:</b> %{y}<br>" +
                        "<extra></extra>"
                }
    
                traces.push(trace);
            });
    
            this.setState({
                data: traces
            })
        }

        //update chart title
        if(title !== undefined){
            this.setState({
                layout: {
                    title: title
                }
            });
        }
    }

    render() { 
        return (  
            <Plot
                data={this.state.data}
                layout={this.state.layout}
                config={this.state.config}
                style={{ width:"100%", height: this.state.height }}
            />
        );
    }
}

const mapStateToProps = state => ({
    players: getPlayers(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingPlayers: () =>  dispatch(loadPlayers())
});

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);