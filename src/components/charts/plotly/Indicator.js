import React, { useState } from 'react';
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

        var data = [
            {
              type: "indicator",
              mode: "number+delta",
              value: value,
              delta: { position: "top", reference: reference },
              domain: { x: [0, 1], y: [0, 1] },
              title: { text: this.props.title }
            }
        ];
          
        var layout = {
            margin: { t: 0, b: 0, l: 0, r: 0 }
        };

        this.setState({
            data: data,
            layout: layout
        });
    }

    render() { 
        return ( 
            <Plot 
                data={this.state.data}
                layout={this.state.layout}
                style={{ width:"100%", maxWidth: "420px", minHeight: "220px", margin: "0 auto" }}
            /> 
        );
    }
}
 
export default Indicator;