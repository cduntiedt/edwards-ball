import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    withStyles
} from '@material-ui/core';
import LineChart from '../charts/plotly/LineChart';
import StatCategorySelect from '../selects/StatCategorySelect';

const useStyles = theme => ({
    header:{
        color: 'white',
        background: "linear-gradient(90deg, rgb(12, 35, 64) 45%, rgb(29,17,96) 55%)"
    }
});

class GrowthCompCard extends React.Component {
    constructor(props) {
        super(props);
        this.statCategoryHandler = this.statCategoryHandler.bind(this);
        this.state = { 
            categorySeleted: true, 
            category: {
                id: 'PTS',
                text: 'Points'
            }
        }
    }

    statCategoryHandler(value){
        this.setState({
            category: value,
            categorySeleted: true
        });
    }

    render() { 
        let classes = this.props.classes;

        return ( <div>
            <Card>
                <CardHeader
                    className={classes.header}
                    title={this.props.perMode + ' Growth Comparison'}
                    style={{background: "linear-gradient(90deg, rgb(12, 35, 64) 45%, rgb(29,17,96) 55%)"}}
                />
                <CardContent>
                    <StatCategorySelect value={this.state.category.id} handleChange={this.statCategoryHandler}></StatCategorySelect>

                    {this.state.categorySeleted 
                        ? <LineChart 
                            data={this.props.data} 
                            x={'GAME_DATE'} 
                            y={this.state.category.id} 
                            title={this.state.category.text}
                            perMode={this.props.perMode}/>
                        : <div></div>
                    }
                </CardContent>
            </Card>
        </div> );
    }
}
 
export default withStyles(useStyles)(GrowthCompCard);