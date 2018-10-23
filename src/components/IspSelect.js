import React from 'react';
import {Query} from "react-apollo";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    select: {
        '&:before': {
            borderColor: "#1565c0",
        },
        '&:after': {
            borderColor: "#1565c0",
        },
        '&:hover': {
            borderColor: "#1565c0",
        },
        color: 'white'
    },
    icon: {
        fill: 'white',
    },
    grow: {
        marginLeft: 10,
        flexGrow: 1,
    },
};
const GET_DOMAINS = gql`{
    appuser {
        appuser_isps {
            isp_id
            domain
            company
        }
    }
}
`;

class IspSelect extends React.Component {
    state = {
        open: false,
    };

    handleChange = event => {
        const ispId = event.target.value;
        this.props.setIspId(ispId);
        this.setState({[event.target.name]: event.target.value});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        const {classes, ispId} = this.props;

        return (<Query query={GET_DOMAINS}>
            {({loading, error, data}) => {
                if (loading) return (
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        <CircularProgress className={classes.progress} color="secondary"/>
                    </Typography>
                );
                if (error) {
                    return (
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            ISP Company
                        </Typography>
                    );
                }

                return (
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        <form autoComplete="off">
                            <FormControl className={classes.formControl}>
                                {
                                    (data.appuser.appuser_isps.length === 1) ? (
                                        <Typography variant="h6" color="inherit"
                                                    className={classes.grow}>
                                            {data.appuser.appuser_isps[0].company}
                                        </Typography>
                                    ) : (
                                        <Select
                                            className={classes.select}
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                            onOpen={this.handleOpen}
                                            value={this.state.ispId ? this.state.ispId : ispId}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'ispId',
                                                classes: {
                                                    icon: classes.icon,
                                                }
                                            }}
                                        >
                                            {data.appuser.appuser_isps.map(isp => (
                                                <MenuItem key={isp.isp_id} value={isp.isp_id}>{isp.company}</MenuItem>
                                            ))}
                                        </Select>)
                                }
                            </FormControl>
                        </form>
                    </Typography>
                );

            }}
        </Query>);
    }
}

IspSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    ispId: PropTypes.number.isRequired,
    setIspId: PropTypes.func.isRequired
};

export default withStyles(styles)(IspSelect);