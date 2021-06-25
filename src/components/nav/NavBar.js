import React from 'react';
import {
    AppBar,
    Toolbar,
    Link,
    Typography
} from '@material-ui/core';
import { SportsBasketball } from '@material-ui/icons';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6"  >
                            <Link href='#' color="inherit">
                                Edwards
                                <SportsBasketball />
                                Ball
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
         );
    }
}
 
export default NavBar;