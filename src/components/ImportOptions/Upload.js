import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 1.5,
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    root: {
        marginTop: theme.spacing.unit * 4
    }
});

class Upload extends React.Component {
    state = {
        spacing: '8',
    };

    render() {
        const {classes, handleUploadEvent, fileName} = this.props;
        const {spacing} = this.state;
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Typography variant="h6" color="inherit">
                        Select a CSV file to upload
                    </Typography>
                    <Grid container spacing={Number(spacing)}>
                        <Grid item xs={12}>
                            <Grid container justify="flex-start" spacing={Number(spacing)}>
                                <Grid key={"uploadFIeld"} item>
                                    <TextField
                                        id="outlined-full-width"
                                        label=""
                                        placeholder="Upload a CSV file"
                                        margin="dense"
                                        variant="filled"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={fileName}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                                <Grid key={"uploadButton"} item>
                                    <input
                                        accept=".csv, text/csv"
                                        className={classes.input}
                                        id="outlined-button-file"
                                        type="file"
                                        onChange={handleUploadEvent}
                                    />
                                    <label htmlFor="outlined-button-file">
                                        <Button variant="contained" component="span" className={classes.button}
                                                color="primary">
                                            Upload
                                            <CloudUploadIcon className={classes.rightIcon}/>
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <a href="https://docs.google.com/spreadsheets/d/1IbELYOfCnqSWPcLLC-wse-pt1Cwunpb2vmZy9iGCtZ4/edit#gid=0"
                       target="_blank" rel="noopener noreferrer">View template &#8681; </a>
                </div>
            </React.Fragment>
        );
    }
}

Upload.propTypes = {
    classes: PropTypes.object.isRequired,
    handleUploadEvent: PropTypes.func.isRequired,
    fileName: PropTypes.string.isRequired
};

export default withStyles(styles)(Upload);