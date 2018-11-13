import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import successImage from '../../assets/success.png'

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
        position: "absolute",
        margin: "auto",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    imageSize: {
        height: '200px',
        width: '200px',
    }
};

function ImportSuccess(props) {
    const {classes} = props;
    return (
        <div className={classes.row}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={24}
            >
                <Grid item>
                    <img src={successImage} className={classes.imageSize} alt='SUCCESS'/>
                </Grid>

                <Grid item>
                    <Typography variant='h2'> SUCCESS!</Typography>
                </Grid>

                <Grid item>
                    <Button color='primary' variant="contained" href='https://dev.visp.net'>Go to app</Button>
                </Grid>
            </Grid>
        </div>
    );
}

ImportSuccess.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImportSuccess);