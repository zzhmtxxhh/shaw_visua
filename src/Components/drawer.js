import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React from "react";

export default class AppDrawer extends React.Component {



    constructor(props){
        super(props)

        this.state={
            open:this.props.toggleState
        }

        this.toggleDrawer = this.toggleDrawer.bind(this)


    }

    toggleDrawer(open){
        this.props.toggleDrawer(open)
    }


    render() {

        return (


                <SwipeableDrawer

                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                    open={this.state.open}
                >

                    <div style={{width: "300px"}}
                         onClick={this.toggleDrawer(false)}
                         onKeyDown={this.toggleDrawer( false)}>
                        <List>
                            {['Capacity', 'Performance', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <List>
                            {['Capacity', 'Performance', 'Spam','Banana','Oragne','Durain'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>


                </SwipeableDrawer>
        )
    }
}