import React from 'react';
import Plot from 'react-plotly.js';

class DonutChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            config: {
                responsive: true
            },
            layout: {
                images: []
            },
            data: []
        }
    }

    loadChart() {
        let fields = this.props.fields;

        let data = [{
            values: fields.map(field => this.props.data[field]),
            labels: fields,
            hole: .5,
            type: 'pie'
        }];

        let layout = {
            images: [
                {
                    layer: "below",
                    x: 0.35,
                    y: 0.47,
                    sizex:0.45,
                    sizey:0.45,
                    source: this.props.image,
                    xanchor: "middle",
                    yanchor: "middle",
                }
            ]
        };

        this.setState({
            data: data,
            layout: layout
        })
    }

    componentDidMount(){
        this.loadChart();
    }

    render() { 
        return ( 
            <Plot
                data={this.state.data}
                layout={this.state.layout}
                config={this.state.config}
                // style={{ width:"100%", height: this.state.height }}
            />
         );
    }
}
 
export default DonutChart;