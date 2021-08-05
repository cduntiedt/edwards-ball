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

    loadChart(){
        this.setLayout();
       
        let fields = this.props.fields;

        let data = [{
            values: fields.map(field => this.props.data[field]),
            labels: fields,
            hole: .5,
            type: 'pie'
        }];

        this.setState({
            data: data
        });
    }

    //reset the graph layout when the window is resized
    setLayout(){
        //determine image location based on screen size
        let size = 0.65;
        let posY = 0.48;
        let posX = 0.2;

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
                    x: posX,
                    y: posY,
                    sizex: size,
                    sizey: size,
                    source: this.props.image,
                    xref: "paper",
                    yref: "paper",
                    xanchor: "middle",
                    yanchor: "middle",
                }
            ]
        };

        this.setState({
            layout: layout
        });
    }

    componentDidMount(){
        // //resize the graph when the window size changes
        // window.addEventListener("resize", this.setLayout.bind(this));
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

    // componentWillUnmount(){
    //     window.removeEventListener("resize", this.setLayout);
    // }

    render() { 
        return ( 
            <Plot
                data={this.state.data}
                layout={this.state.layout}
                config={this.state.config}
                style={{ width:"100%", maxWidth: "420px", minHeight: "375px", margin: "0 auto" }}
            />
         );
    }
}
 
export default DonutChart;