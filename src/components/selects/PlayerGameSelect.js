import axios from 'axios';
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

class PlayerGameSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { 
            value: null,
            data: []
        }
    }

    loadGames(){
        axios.get('/data/game-log.json')
        .then(response => {
            let data = response.data.filter(game => game['Player_ID'] === this.props.player['PERSON_ID']);

            this.setState({
                data: data
            })
        })
        .catch(error => {
            console.log('Unable to load games.');
        });
    }

    componentDidMount(){
        this.loadGames();
    }

    handleChange(e) {
        //set selected stat category
        let value = e.target.value;
        this.setState({
            value: value
        });

        let game = this.state.data.filter(g => g['Game_ID'] === value)[0];
        if(this.props.handleChange !== undefined){
            this.props.handleChange(game);
        }
    }

    render() { 
        return ( 
            <div>
                <FormControl className={this.props.classes.root}>
                    <InputLabel>Select a game</InputLabel>
                    <Select
                        defaultValue=""
                        value={this.props.value}
                        onChange={this.handleChange}>
                        { 
                            this.state.data.map(game => {
                                return <MenuItem 
                                    value={game['Game_ID']} 
                                    key={game['Game_ID']}>
                                        {game['GAME_DATE'] + ' ' + game['MATCHUP']}
                                    </MenuItem>;
                            })
                        }
                    </Select>
                </FormControl>
            </div>
         );
    }
}
 
export default withStyles(useStyles)(PlayerGameSelect);