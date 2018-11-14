import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import vispLogo from '../assets/visp-logo-footer.png'


const styles = theme => ({
    appBar: {
        top: 'auto',
        padding: theme.spacing.unit,
        bottom: 0,
    },
});

class Footer extends Component {
    render() {
        const {classes} = this.props;
        const currentYear = new Date().getFullYear();
        return (
            <AppBar position="fixed" color="primary" className={classes.appBar} color="default">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={8}
                >
                    <Grid item>
                        <a href="/">
                            <img alt="Visp.net" src={vispLogo}/>
                        </a>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" color="inherit" gutterBottom>
                            © Copyright {currentYear} visp.net, Inc. All rights reserved.
                        </Typography>
                    </Grid>

                </Grid>
            </AppBar>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Footer);
