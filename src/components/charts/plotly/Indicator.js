import React from 'react';
import Plot from 'react-plotly.js';

class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: null,
            layout: null
        }
    }

    componentDidMount(){
        // //resize the graph when the window size changes
        // window.addEventListener("resize", this.setLayout.bind(this));
        this.loadIndicator();
    }

    componentDidUpdate(prevProps){
        //if the props change, reload the chart
        if(prevProps !== this.props){
            //TODO: debounce
            setTimeout(() => {
                this.loadIndicator();
            },1000);
        }
    }

    loadIndicator(){
        let value = this.props.value;
        let reference = this.props.reference;
        let windowWidth = window.innerWidth;

        var data = [
            {
              type: "indicator",
              mode: "number+delta",
              value: value,
              delta: { position: "top", reference: reference },
              domain: { x: [0, 1], y: [0, 1] },
              number: { font: { size: windowWidth <= 480 ? 50 : 80 } },
              title: { text: this.props.title }
            }
        ];
          
        var layout = {
            margin: { t: 0, b: 0, l: 0, r: 0 }
        };

        var config = {
            responsive: true,
            displaylogo: false
        };

        var style = {
            width:"100%", 
            maxWidth: "420px", 
            minHeight: windowWidth <= 480 ? "150px" : "220px", 
            margin: "0 auto" 
        }

        this.setState({
            data: data,
            layout: layout,
            config: config,
            style: style
        });
    }

    render() { 
        return ( 
            <Plot 
                data={this.state.data}
                layout={this.state.layout}
                config={this.state.config}
                style={this.state.style}
            /> 
        );
    }
}
 
export default Indicator;