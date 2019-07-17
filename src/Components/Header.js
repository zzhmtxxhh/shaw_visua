import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Grid from "../DashBoard/Grid"
import ToolBox from '../DashBoard/ToolBox.js'
import Drawer from './drawer.js'
import Example1 from '../DashBoard/Example1.js'
import Another from '../DashBoard/another_grid'


import C3example from '../DashComponent/C3_example.js'
import C3_example from "../DashComponent/C3_example";
export class ButtonAppBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            layout: []
        };

        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this)
    }

    toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({
            open: open
        })

    }

    onLayoutChange(layout) {

        this.setState({ layout: layout });
    }




    render() {
        return (
            <div>
                <AppBar position="static" style={{backgroundColor: "#48a4d1"}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            DashBoard
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/*<C3_example/>*/}


                <Another onLayoutChange={this.onLayoutChange}/>






                <SwipeableDrawer

                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                    open={this.state.open}
                >

                    <div style={{width: "300px"}}
                         onClick={this.toggleDrawer(false)}
                         onKeyDown={this.toggleDrawer( false)}>
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <List>
                            {['All mail', 'Trash', 'Spam','Banana','Oragne','Durain'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>


                </SwipeableDrawer>








            </div>

        )

    }
}


export default ButtonAppBar;