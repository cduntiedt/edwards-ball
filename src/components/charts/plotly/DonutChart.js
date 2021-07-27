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
                    x: 0.30,
                    y: 0.47,
                    sizex:0.45,
                    sizey:0.45,
                    source: this.props.image,
                    xanchor: "left",
                    yanchor: "top",
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