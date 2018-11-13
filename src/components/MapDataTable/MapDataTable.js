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
import {ImportDataContext} from "../../context/ImportDataProvider";
import Loading from "../Loader";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    list: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    headerLabel: {
        marginTop: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        backgroundColor: "#EBEBEB"
    },
    lineItems: {
        borderBottom: '1px solid #EBEBEB'
    }
});


class MapDataTable extends React.Component {

    renderList = (context) => {
        const {classes} = this.props;
        const {uboFields, importData, dataMap} = context.state;
        return (
            <List className={classes.list}>
                {uboFields.map(field => (
                    <ListItem key={field.key} button className={classes.lineItems}>
                        <DataFieldSelect
                            currentRow={field}
                            importData={importData}
                            header={false}
                            updateDataMap={context.updateDataMap}
                            dataMapValue={dataMap[field.key]}
                        />
                        <CssBaseline/>
                    </ListItem>
                ))}
            </List>
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> No data to map! </Typography></div>);
                    const {loading} = context.state;
                    return (
                        <React.Fragment>
                            <Grid className={classes.root} container direction="column" spacing={0}>
                                <Grid item xs={12}>
                                    <Typography variant="title" style={{margin: 5}}>
                                        <b>Map your fields to Ultimate Back Office fields</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.headerLabel}>
                                        <DataFieldSelect header={true}/>
                                    </div>
                                    <Divider light/>
                                    {loading ? <Loading/> : this.renderList(context)}
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    );
                }}
            </ImportDataContext.Consumer>
        );
    }
}

MapDataTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapDataTable);