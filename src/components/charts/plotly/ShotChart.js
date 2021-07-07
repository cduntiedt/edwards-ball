import React from 'react';
import Plot from 'react-plotly.js';

class ShotChart extends React.Component {
    threept_break_y = 89.47765084
    three_line_col = "#777777"
    main_line_col = "#777777"

    //function to create a linspace array
    linspace(startValue, stopValue, cardinality) {
        var arr = [];
        var step = (stopValue - startValue) / (cardinality - 1);
        for (var i = 0; i < cardinality; i++) {
            arr.push(startValue + (step * i));
        }
        return arr;
    }

    drawArc(x_center = 0.0, y_center = 0.0, a = 10.5, b = 10.5, start_angle = 0.0, end_angle = 2 * Math.PI, N = 200, closed = false) {
        let t = this.linspace(start_angle, end_angle, N);
        let path = '';

        for (let index = 0; index < t.length; index++) {
            let x = x_center + a * Math.cos(t[index]);
            let y = y_center + b * Math.sin(t[index]);

            if (index === 0) {
                path += 'M ' + x + ', ' + y;
            } else {
                path += 'L ' + x + ', ' + y;
            }
        }

        if (closed) {
            path += ' Z';
        }

        return path;
    }

    constructor(props) {
        let margins = 10;
        let width = 600;
        let height = width * (470 + 2 * margins) / (500 + 2 * margins);

        super(props);
        this.state = {
            layout: {
                width: width,
                height: height,
                margin: {
                    l: 20,
                    r: 20,
                    t: 20,
                    b: 20
                },
                plot_bgcolor: "white",
                paper_bgcolor: "white",
                yaxis: {
                    scaleanchor: "x",
                    scaleratio: 1,
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    ticks: '',
                    showticklabels: false,
                    fixedrange: true,
                    //range: [-52.5, 417.5]
                    range: [-62.5, 427.5]
                },
                xaxis: {
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    ticks: '',
                    showticklabels: false,
                    fixedrange: true,
                    //range: [-250, 250]
                    range: [-260, 260]
                },
                shapes: [
                    {
                        type: "rect", x0: -250, y0: -52.5, x1: 250, y1: 417.5,
                        line: { color: this.main_line_col, width: 1 },
                        layer: 'below'
                    },
                    {
                        type: "rect", x0: -80, y0: -52.5, x1: 80, y1: 137.5,
                        line: { color: this.main_line_col, width: 1 },
                        layer: 'below'
                    },
                    {
                        type: "rect", x0: -60, y0: -52.5, x1: 60, y1: 137.5,
                        line: { color: this.main_line_col, width: 1 },
                        layer: 'below'
                    },

                    //free throw circle
                    {
                        type: "circle", x0: -60, y0: 77.5, x1: 60, y1: 197.5, xref: "x", yref: "y",
                        line: { color: this.main_line_col, width: 1 },
                        layer: 'below'
                    },
                    {
                        type: "line", x0: -60, y0: 137.5, x1: 60, y1: 137.5,
                        line: { color: this.main_line_col, width: 1 },
                        layer: 'below'
                    },
                    {
                        type: "rect", x0: -2, y0: -7.25, x1: 2, y1: -12.5,
                        line: { color: "#ec7607", width: 1 },
                        fillcolor: '#ec7607',
                    },
                    {
                        type: "circle", x0: -7.5, y0: -7.5, x1: 7.5, y1: 7.5, xref: "x", yref: "y",
                        line: { color: "#ec7607", width: 1 },
                    },
                    {
                        type: "line", x0: -30, y0: -12.5, x1: 30, y1: -12.5,
                        line: { color: "#ec7607", width: 1 },
                    },
                    //restricted area arc
                    {
                        type: "path",
                        path: this.drawArc(0, 0, 40, 40, 0, Math.PI),
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    //three point arc
                    {
                        type: "path",
                        path: this.drawArc(0, 0, 237.5, 237.5, 0.386283101, Math.PI - 0.386283101),
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: -220, y0: -52.5, x1: -220, y1: this.threept_break_y,
                        line: { color: this.three_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: -220, y0: -52.5, x1: -220, y1: this.threept_break_y,
                        line: { color: this.three_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: 220, y0: -52.5, x1: 220, y1: this.threept_break_y,
                        line: { color: this.three_line_col, width: 1 }, layer: 'below'
                    },

                    {
                        type: "line", x0: -250, y0: 227.5, x1: -220, y1: 227.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: 250, y0: 227.5, x1: 220, y1: 227.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: -90, y0: 17.5, x1: -80, y1: 17.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: -90, y0: 27.5, x1: -80, y1: 27.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: -90, y0: 57.5, x1: -80, y1: 57.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: -90, y0: 87.5, x1: -80, y1: 87.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: 90, y0: 17.5, x1: 80, y1: 17.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: 90, y0: 27.5, x1: 80, y1: 27.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: 90, y0: 57.5, x1: 80, y1: 57.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },
                    {
                        type: "line", x0: 90, y0: 87.5, x1: 80, y1: 87.5,
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },

                    {
                        type: "path",
                        path: this.drawArc(0, 417.5, 60, 60, -0, -Math.PI),
                        line: { color: this.main_line_col, width: 1 }, layer: 'below'
                    },

                ]
            },
        }
    }

    render() {
        return (
            <Plot
                data={this.state.data}
                layout={this.state.layout}
                config={this.state.config}
            // style={{ width:"100%" }}
            // style:{{ width:"100%", height: "100%" }}
            />
        );
    }
}


export default ShotChart;