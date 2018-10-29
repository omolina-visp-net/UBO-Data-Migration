import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Avatar from '@material-ui/core/Avatar';
import CheckCircle from '@material-ui/icons/Check';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactSelect from "./ReactSelect";

const styles = theme => ({
    root: {
        borderBottom: "dashed"
    },
    iconHover: {
        color: green,
        '&:hover': {
            color: green[800],
        },
    },
    greenAvatar: {
        color: '#fff',
        backgroundColor: green[500],
    },
    redAvatar: {
        color: '#fff',
        backgroundColor: red[500],
    },
});

class DataFieldSelect extends React.Component {
    renderHeader = () => {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs><Typography variant='subheading'><b>ULTIMATE BACK OFFICE FIELD</b></Typography></Grid>
                <Grid item xs> <Typography variant='subheading'><b>YOUR FIELD</b></Typography></Grid>
                <Grid item xs> <Typography> </Typography></Grid>
            </Grid>
        );
    }

    renderRows = () => {
        const {classes, currentRow, importData, dataMapValue} = this.props;
        const selectValues = Object.keys(importData[0]);
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs><Typography>{currentRow.label}</Typography></Grid>
                <Grid item xs>
                    <div style={{height: 50, width: 250}}>
                        <ReactSelect rows={selectValues} uboFieldKey={currentRow.key}/>
                    </div>
                </Grid>
                <Grid item xs>
                    {dataMapValue ? (
                            <Avatar className={classes.greenAvatar}>
                                <CheckCircle/>
                            </Avatar>)
                        : (
                            <Avatar className={classes.redAvatar}>
                                <ErrorOutline/>
                            </Avatar>)
                    }
                </Grid>
            </Grid>

        );
    }


    render() {
        const {header} = this.props;
        return (
            <React.Fragment>

                <CssBaseline/>
                {header ? this.renderHeader() : this.renderRows()}
            </React.Fragment>
        );
    }
}

DataFieldSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    header: PropTypes.bool.isRequired,
    importData: PropTypes.array,
    currentRow: PropTypes.object,
    dataMapValue: PropTypes.string
};

export default withStyles(styles)(DataFieldSelect);