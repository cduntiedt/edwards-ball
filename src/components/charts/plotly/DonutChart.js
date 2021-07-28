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

        //TODO: need to resize image based on screen size
        let layout = {
            margin: {
                l:0,
                r:0,
                t:0,
                b:0
            },
            images: [
                {
                    layer: "below",
                    x: 0.25,
                    y: 0.5,
                    sizex:0.5,
                    sizey:0.5,
                    source: this.props.image,
                    xref: "paper",
                    yref: "paper",
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

    componentDidUpdate(prevProps){
        //if the props change, reload the chart
        if(prevProps !== this.props){
            //TODO: debounce
            setTimeout(() => {
                this.loadChart();
            },1000);
        }
    }

    render() { 
        return ( 
            <Plot
                data={this.state.data}
                layout={this.state.layout}
                config={this.state.config}
                style={{ width:"100%" }}
            />
         );
    }
}
 
export default DonutChart;