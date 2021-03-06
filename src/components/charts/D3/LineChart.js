import * as d3 from 'd3';
import React from 'react';
import "d3-time-format";

class LineChart extends React.Component {
    width = '100%';
    height = 500;

    constructor(props) {
        super(props);
        this.state = {  }

        this.createLineChart = this.createLineChart.bind(this);
    }

    componentDidMount(){
        this.createLineChart();
    }

    componentDidUpdate(){
        this.createLineChart();
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

    createLineChart(){
        d3.selectAll('svg > *').remove();

        const node = this.node;
        const data = this.props.data;
        const x = this.props.x;
        const y = this.props.y;
        const width = this.props.width !== undefined ? this.props.width : 500;
        const height = this.props.height !== undefined ? this.props.height : 500;

        //verify the x and y coordinates exist
        if(data !== undefined && x !== undefined && y !== undefined){
            data.forEach(player => {
                player.games.forEach(game => {
                    game[x] = this.convertDate(game[x]);
                })
            });
              
            //set chart margins
            const margin = { top: 50, right: 50, bottom: 50, left: 50 };
            
            //x min and max values
            const xMinValue = d3.min(data.map(d => d3.min(d.games.map(game => game[x]))));
            const xMaxValue = d3.max(data.map(d => d3.max(d.games.map(game => game[x]))));
    
            //y min and max values
            const yMinValue = d3.min(data.map(d => d3.min(d.games.map(game => game[y]))));
            const yMaxValue = d3.max(data.map(d => d3.max(d.games.map(game => game[y]))));
            
            // //set chart x axis scale
            // const xScale = d3.scaleLinear()
            //     .domain([xMinValue, xMaxValue])
            //     .range([0, width]);

            const xScale = d3.scaleTime()
                .domain([xMinValue, xMaxValue])
                .range([0, width]);

            //set chart y axis scale 
            const yScale = d3.scaleLinear()
                .range([height, 0])
                .domain([0, yMaxValue]);
    
            //create chart line
            const line = d3.line()
                .x(d => xScale(d[x]))
                .y(d => yScale(d[y]))
                .curve(d3.curveLinear)


            const svg = d3.select(node)
                //.attr('width', width + margin.left + margin.right)
                //.attr('height', height + margin.top + margin.bottom)
                .attr("width", '100%')
                .attr("height", '100%')
                .attr('viewBox','0 0 '+ Math.min(this.width,this.height) + ' ' + Math.min(this.width,this.height))
                .attr('preserveAspectRatio','xMinYMin')
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);
    
            //grid lines
            svg.append('g')
                .attr('class', 'grid')
                .attr('transform', `translate(0,${height})`)
                .call(
                    d3.axisBottom(xScale)
                    .tickSize(-height)
                    .tickFormat(''),
                );
            
            //grid lines
            svg.append('g')
                .attr('class', 'grid')
                .call(
                    d3.axisLeft(yScale)
                    .tickSize(-width)
                    .tickFormat(''),
                );
            
            //x-axis
            svg.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom().scale(xScale).tickSize(15));
            
            //y-axis
            svg.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(yScale));
            

            data.forEach(player => {
                //data lines
                svg.append('path')
                    .datum(player.games)
                    .attr('fill', 'none')
                    .attr('stroke', player.color)
                    .attr('stroke-width', 3)
                    .style('opacity', 0.5)
                    .attr('class', 'line') 
                    .attr('d', line)
                    .on('mouseover', function() {
                        d3.select(this)
                            .transition()
                            .duration(500)
                            .style('opacity', 1);
                    })
                    .on('mouseout', function() {
                        d3.select(this)
                            .transition()
                            .duration(500)
                            .style('opacity', 0.5);
                    })
            });
        }
    }

    render() { 
        return ( 
            <div width={this.width} height={this.height}>
                <svg ref={node => this.node = node}></svg>
            </div>
        );
    }
}
 
export default LineChart;