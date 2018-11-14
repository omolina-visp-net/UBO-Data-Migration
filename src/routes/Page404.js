import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    header: {
        backgroundColor: "#4383cc",
        color: theme.palette.common.white,
        padding: theme.spacing.unit * 2,
        height: "100%"
    },
});

class Page404 extends Component {

    render() {

        const {classes} = this.props;
        return (
            <main>
                <div className={classes.header}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={8}
                    >
                        <Grid item>
                            <Typography variant="h1" color="inherit" gutterBottom>
                                404
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" color="inherit" gutterBottom>
                                This is not the page you are looking for.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button color='primary' variant="contained" href='/'>Go home</Button>
                        </Grid>

                    </Grid>
                </div>
            </main>
        );
    }
}

Page404.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Page404);
