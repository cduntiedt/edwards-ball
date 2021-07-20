import React from 'react';
import Plot from 'react-plotly.js';

class DonutChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            config: {
                responsive: true
            },
            data: [ 
                {"PTS": 19.3},
                {"AST": 2.9},
                {"REB": 4.7,}
            ]
         }
    }

    render() { 

        let keys = this.state.data.forEach((value) => {
            return Object.keys(value)[0];
        })

        console.log(keys);
        let data = [{
            values: this.state.data.map(x => x),
            labels: keys,
            hole: .5,
            type: 'pie'
        }];


        return ( 
            <Plot
                data={this.state.data}
                // layout={this.state.layout}
                config={this.state.config}
                // style={{ width:"100%", height: this.state.height }}
            />
         );
    }
}
 
export default DonutChart;