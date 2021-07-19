import React, { Component } from 'react';
import axios from 'axios';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    withStyles,
    Typography
} from '@material-ui/core';
import {
    Height,
    FitnessCenter
} from '@material-ui/icons';


const useStyles = theme => ({
    media: {
        textAlign: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    whiteBackground: {
        backgroundColor: 'white'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
});

class PlayerProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getHeadlineStats() {
        let player = this.props.player;

        axios.get('/data/headline-stats.json')
            .then(response => {
                let data = response.data.filter(x => x['PLAYER_ID'] === player['PERSON_ID'])[0];

                this.setState({
                    headlines: data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getHeadlineStats();
    }

    render() {
        let classes = this.props.classes;
        let player = this.props.player;
        let team = player['TEAM_CITY'] + ' ' + player['TEAM_NAME'];
        let primaryColor = player['PRIMARY_COLOR'];
        let secondaryColor = player['SECONDARY_COLOR'];
        let thirdColor = player['THIRD_COLOR'];

        return (
            <Card>
                <CardHeader
                    style={{
                        backgroundColor: primaryColor,
                        borderBottom: "3px solid " + thirdColor
                    }}
                    title={
                        <Typography 
                            variant='h5' 
                            style={{color:"white"}}
                        >
                            {player['DISPLAY_FIRST_LAST']}
                        </Typography>
                    }
                    subheader={
                        <Typography 
                            variant='body1'
                            style={{color:"white"}}
                        >
                            {team}
                        </Typography>
                    }
                />

                <CardMedia 
                    className={classes.media}
                    style={{
                        backgroundColor: secondaryColor,
                        backgroundImage: 'url(img/LOGO-' + player['TEAM_ABBREVIATION'] + '.svg)',
                    }}
                >
                    <img
                        src={'img/' + player['PERSON_ID'].toString() + '.png'}
                        alt={player['DISPLAY_FIRST_LAST']}
                        style={{ marginBottom: "-4px" }}
                    />
                </CardMedia>

                <CardContent className={classes.whiteBackground}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: secondaryColor}}>
                                    <Height/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Height" secondary={player['HEIGHT']}/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: secondaryColor}}>
                                    <FitnessCenter/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Weight" secondary={player['WEIGHT']}/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: secondaryColor}}>
                                    {player['POSITION'].substring(0,1)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Position" secondary={player['POSITION']}/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: secondaryColor}}>
                                    {player['JERSEY']}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Jersey Number" secondary={ '#' + player['JERSEY']}/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: secondaryColor}}>
                                    {player['DRAFT_NUMBER']}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Draft Overall" secondary={ '#' + player['DRAFT_NUMBER']}/>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        );
    }
}

export default (withStyles(useStyles)(PlayerProfileCard));