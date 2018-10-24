import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DataFieldSelect from "./DataFieldSelect";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 500,
        [theme.breakpoints.up('md')]: {
            maxHeight: 600,
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            maxHeight: 400,
        },
        [theme.breakpoints.down('xs')]: {
            maxHeight: 300,
        },
    },
    headerLabel: {
        padding: theme.spacing.unit * 2,
        backgroundColor: "#EBEBEB"
    },
    lineItems: {
        borderBottom: '1px solid #EBEBEB'
    }
});


function createData(uboFieldName, otherFieldName, isValid) {
    return {uboFieldName, otherFieldName, isValid};
}

const rows = [
    createData('Username', "Username", true),
    createData('Password', 'Password', true),
    createData('First Name', 'First Name', false),
    createData('Last Name', 'Last Name', true),
    createData('Address Line 1', 'Address Line 1', false),
    createData('Address Line 2', 'Address Line 2', false),
    createData('City', 'City', false),
    createData('State', 'State', false),
    createData('Email Address', 'Email Address', false),
    createData('Mobile Phone', 'Mobile Phone', false),
    createData('Work Phone', 'Work Phone', false),
    createData('Home Phone', 'Home Phone', false),
    createData('Fax', 'Fax', false),
];


class MapDataTable extends React.Component {


    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <Grid className={classes.root} container direction="column" spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="title"><b>Map your fields to QuickBooks fields</b></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.headerLabel}>
                            <DataFieldSelect rows={rows} currentRow={rows[0]} header={true}/>
                        </div>
                        <Divider light/>
                        <List className={classes.list}>
                            {rows.map(row => (
                                <ListItem key={row.uboFieldName} button className={classes.lineItems}>
                                    <DataFieldSelect rows={rows} currentRow={row} header={false}/>
                                    <CssBaseline/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

MapDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapDataTable);