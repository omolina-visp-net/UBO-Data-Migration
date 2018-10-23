import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Upload from "./Upload";
import Sonar from "./Sonar";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    group: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    }
});

class ImportOptions extends React.Component {
    state = {
        value: 'upload',
    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Select import option:</FormLabel>
                        <RadioGroup
                            aria-label="Select import option:"
                            name="option"
                            value={this.state.value}
                            onChange={this.handleChange}
                            className={classes.group}
                        >
                            <FormControlLabel value="upload" control={<Radio/>} label="Upload"/>
                            <FormControlLabel value="sonar" control={<Radio/>} label="Sonar"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                {value === 'upload' ? (<Upload/>) : (<Sonar/>)}
            </React.Fragment>
        );
    }
}

ImportOptions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImportOptions);