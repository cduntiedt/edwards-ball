import React from 'react';
import {
    Avatar,
    Card,
    CardHeader,
    CardContent,
    Typography,
    withStyles
} from '@material-ui/core';

const useStyles = theme => ({
    header:{
        color: 'white',
        background: "linear-gradient(90deg, rgb(12, 35, 64) 45%, rgb(29,17,96) 55%)"
    },
    avatar:{
        backgroundColor: 'white'
    }
});

class PlayerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let player = this.props.player;
        let classes = this.props.classes;

        return ( 
            <Card>
                <CardHeader
                    className={classes.header}
                    style={{
                        background: player['PRIMARY_COLOR']
                    }}
                    avatar={
                        <Avatar 
                            className={classes.avatar}
                            alt={player['DISPLAY_FIRST_LAST']} 
                            src={'img/' + player['PERSON_ID'].toString() + '.png'}  
                        />
                    }
                    title={
                        <Typography 
                            variant='h5'
                        >
                            {player['DISPLAY_FIRST_LAST']}
                        </Typography>
                    }
                    subheader={
                        <Typography 
                            variant='body1'
                        >
                            {this.props.subheader}
                        </Typography>
                    }
                />
                <CardContent>
                    {this.props.children}
                </CardContent>
            </Card> 
        );
    }
}
 
export default withStyles(useStyles)(PlayerCard);