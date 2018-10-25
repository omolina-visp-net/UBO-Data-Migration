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
import {ImportDataContext} from "../../context/ImportDataProvider";
import Typography from "@material-ui/core/Typography/Typography";

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

    render() {
        const {classes} = this.props;
        return (
            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> Context should not be empty! </Typography></div>);
                    const {selectedOption, setSelectedOption, handleUploadEvent, fileName, handleSonarInputChange, sonarInputs} = context;
                    return (
                        <React.Fragment>
                            <div className={classes.root}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Select import option:</FormLabel>
                                    <RadioGroup
                                        aria-label="Select import option:"
                                        name="option"
                                        value={String(selectedOption)}
                                        onChange={setSelectedOption}
                                        className={classes.group}
                                    >
                                        <FormControlLabel value="0" control={<Radio/>} label="Upload"/>
                                        <FormControlLabel value="1" control={<Radio/>} label="Sonar"/>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            {context.selectedOption === 0 ? (
                                <Upload handleUploadEvent={handleUploadEvent} fileName={fileName}/>) : (
                                <Sonar handleSonarInputChange={handleSonarInputChange} sonarInputs={sonarInputs}/>)}

                        </React.Fragment>);
                }}
            </ImportDataContext.Consumer>

        );
    }
}

ImportOptions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImportOptions);