import React from 'react';
import Plot from 'react-plotly.js';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            layout: {
                // width: 500,
                // height: 500,
                title: props.title
            }
        }

        this.loadChart = this.loadChart.bind(this);
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
            this.loadChart();
        }
    }

    loadChart(){
        const x = this.props.x;
        const y = this.props.y;
        const data = this.props.data;

        if(data !== undefined){
            let traces = [];

            data.forEach(player => {
                let sum = 0;
                
                let sortedData = player.games.sort((a,b)=> { return this.convertDate(a[x]) - this.convertDate(b[x]) });

                let trace = {
                    x: sortedData.map(game => this.convertDate(game[x])),
                    y: sortedData.map((game, i) => { 
                        sum += game[y];
                        let gameIndex = i + 1;
                        return sum / gameIndex; 
                    }),
                    mode: 'lines',
                    line: {
                        color: player.color
                    }
                }
    
                traces.push(trace);
            });
    
            this.setState({
                data: traces
            })
        }
    }

    render() { 
        return (  
            <Plot
                data={this.state.data}
                layout={this.state.layout}
            />
        );
    }
}
 
export default LineChart;