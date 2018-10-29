import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    grid: {
        margin: theme.spacing.unit * 5,
        height: theme.spacing.unit * 30
    },
});

function Loader(props) {
    const {classes} = props;
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.grid}
        >
            <CircularProgress className={classes.progress} size={100}/>

        </Grid>
    );
}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);