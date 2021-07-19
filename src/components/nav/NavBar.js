import React from 'react';
import {
    AppBar,
    Toolbar,
    Link,
    Typography
} from '@material-ui/core';
import { primaryFont } from '../../theme';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <AppBar style={{background: "linear-gradient(90deg, rgb(12, 35, 64) 45%, rgb(0,120,140) 55%)"}} >
                    <Toolbar style={{margin: '0 auto'}}>
                        <Link href='#' color="inherit">
                            <Typography variant="h3"  >
                                Antman <span style={{fontFamily: primaryFont }}>vs</span> LaMelo
                            </Typography>
                        </Link>
                    </Toolbar>

                     <div
                        style={{
                            background: "linear-gradient(90deg, rgb(120, 190, 32) 45%, rgb(29,17,96) 55%)",
                            width: "100%",
                            height: "4px"
                        }}
                    >
                    </div>
                </AppBar>
            </div>
         );
    }
}
 
export default NavBar;