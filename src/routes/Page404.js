import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    header: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
    },
    userProfileWallContent: {
        padding: `${theme.spacing.unit * 6}px`,
        [theme.breakpoints.up('md')]: {
            paddingRight: 0,
        },
    },
});

class Page404 extends Component {

    render() {

        const {classes} = this.props;
        return (
            <div>
                <main>
                    {/* Main featured post */}
                    <Paper className={classes.header}>
                        <Grid>
                            <div className={classes.userProfileWallContent}>
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    404
                                </Typography>
                                <Typography component="h3" color="inherit" gutterBottom>
                                    This is not the page you are looking for.
                                </Typography>
                            </div>
                        </Grid>
                    </Paper>
                </main>
            </div>
        );
    }
}

Page404.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Page404);
