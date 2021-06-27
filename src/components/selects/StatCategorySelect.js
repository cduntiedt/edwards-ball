import React from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core';

class StatCategorySelect extends React.Component {
    constructor(props) {
        super(props);
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

    handleChange = (e) => {
        //set selected stat category
        let value = e.target.value;
        this.setState({
            value: value
        });
    }

    render() { 
        return ( 
            <div>
                <FormControl>
                    <InputLabel>Category</InputLabel>
                    <Select
                    value={this.state.value}
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
 
export default StatCategorySelect;