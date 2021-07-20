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
                {   
                    "PTS": 19.3, 
                    "AST": 2.9,
                    "REB": 4.7,
                }
            ]
         }
    }

    render() { 

        let data = [{
            values: Object.values(this.state.data[0]),
            labels: Object.keys(this.state.data[0]),
            hole: .5,
            type: 'pie'
        }];

        console.log(data);

        return ( 
            <Plot
                data={data}
                // layout={this.state.layout}
                config={this.state.config}
                // style={{ width:"100%", height: this.state.height }}
            />
         );
    }
}
 
export default DonutChart;