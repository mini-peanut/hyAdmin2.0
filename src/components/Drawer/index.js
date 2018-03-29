import Drawer from 'material-ui/Drawer';
import React from 'react';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  modal: {
    zIndex: 500
  },
  drawerPaper: {
    background: 'rgb(240, 242, 245)',
    minWidth: '70%'
  },
  container: {
    padding: '0 30px'
  }
});

class UI extends React.Component {
  render() {
    const { classes , open, children, anchor} = this.props;
    return (
      <Drawer
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
          modal: classes.modal
        }}
        SlideProps={{
          timeout: {
            exit: 0
          }
        }}
      >

        <div className={classes.container}>
          {children}
        </div>
      </Drawer>
    );
  }
}

export default withStyles(styles)(UI)
