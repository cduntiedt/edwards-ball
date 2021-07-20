import React from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    withStyles
} from '@material-ui/core';

const useStyles = theme => ({
    root: {
        maxWidth: 200,
        width: '100%'
    },
});

class StatCategorySelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { 
            value: '',
            data: [
                { id: "PTS", text: "Points" },
                { id: "AST", text: "Assists" },
                { id: "REB", text: "Rebounds" },
                { id: "STL", text: "Steals" },
                { id: "BLK", text: "Blocks" },
                { id: "TOV", text: "Turnovers" },
                { id: "PF", text: "Fouls" },
                { id: "FGM", text: "FG Made" },
                { id: "FGA", text: "FG Attempts" },
                { id: "FG_PCT", text: "FG %" },
                { id: "FG3M", text: "3PT FG Made"},
                { id: "FG3A", text: "3PT FG Attempts"},
                { id: "FG3_PCT", text: "3PT FG %"},
                { id: "FTM", text: "FT Made"},
                { id: "FTA", text: "FT Attempts"},
                { id: "FT_PCT", text: "FT %"},
                { id: "OREB", text: "Offensive Rebounds"},
                { id: "DREB", text: "Defensive Rebounds"},
                { id: "PLUS_MINUS", text: "Plus/Minus"},
            ]
         }
    }

    handleChange(e) {
        //set selected stat category
        let value = e.target.value;
        this.setState({
            value: value
        });

        let category = this.state.data.filter(cat => cat.id === value)[0];
        //this.props.value = category;
        this.props.handleChange(category);
    }

    render() { 
        return ( 
            <div>
                <FormControl className={this.props.classes.root}>
                    <InputLabel>Category</InputLabel>
                    <Select
                    value={this.props.value}
                    onChange={this.handleChange}>
                        { 
                            this.state.data.map(category => {
                                return <MenuItem value={category.id} key={category.id}>{category.text}</MenuItem>;
                            })
                        }
                    </Select>
                </FormControl>
            </div>
         );
    }
}
 
export default (withStyles(useStyles)(StatCategorySelect));