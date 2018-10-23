import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router-dom';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from "axios";
import classNames from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import vispIcon from "../../assets/sidenav-logo-small.png";
import {decrypt, encrypt} from "../../commons/DataEncryption";


const muitheme = createMuiTheme({
    palette: {
        primary: blueGrey
    },
});

const styles = theme => ({
    colorPrimary: {
        backgroundColor: '#B2DFDB',
    },
    barColorPrimary: {
        backgroundColor: '#00695C',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        width: 24,
        height: 40

    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
});

class Login extends React.Component {
    state = {
        loading: false,
        error: "",
        success: false,
        formData: {
            username: '',
            password: '',
            remember: false
        }
    };

    componentDidMount() {
        const isRemembered = localStorage.getItem("remember");
        if (isRemembered) {
            const {formData} = this.state;
            const username = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            formData['username'] = decrypt(username);
            formData['password'] = decrypt(password);
            formData['remember'] = JSON.parse(isRemembered);
            this.setState({formData});
        }
        localStorage.removeItem("Importer.token");
    }

    handleChange = event => {
        const {formData} = this.state;
        if (formData) {
            formData[event.target.name] = event.target.value;
            this.setState({formData});
        }
    }

    handleCheckBoxChange = event => {
        const {formData} = this.state;
        if (formData) {
            formData['remember'] = event.target.checked;
            this.setState({formData});
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({loading: true, success: false});
        const {formData} = this.state;
        const {username, password, remember} = formData;

        const data = (await this.getToken(username, password));

        if (data.request && !data.request.length && !data.data && !data.response) {
            const error = "Can't Login at this time. Please try again later.";
            this.setState({loading: false, error});
        } else if (!data.data && (data.response.status === 401 || data.response.status === 400)) {
            const error = data.response.data.message;
            this.setState({loading: false, error});
        } else {
            const {appuserId, ispId} = data.data.payload;
            console.log(data.data.token);

            localStorage.setItem("Importer.token", data.data.token);
            localStorage.setItem("Importer.appuserId", appuserId);
            localStorage.setItem("Importer.ispId", JSON.stringify(ispId));
            localStorage.setItem("Importer.selectedIspId", ispId[0]);
            console.log(localStorage.getItem("Importer.token"));

            if (remember) {
                localStorage.setItem("username", encrypt(username));
                localStorage.setItem("password", encrypt(password));
                localStorage.setItem("remember", remember);
            }
            this.setState({loading: false, success: true});
            this.props.history.push("/");
        }
    }

    getToken = async (username, password) => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const path = "authenticate"
            const apiAuthUri = `${apiUrl}/${path}`;


            const response = await Axios.post(
                apiAuthUri, {
                    username: username,
                    password: password
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Acces-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With",
                        "Access-Control-Allow-Methods": "GET, PUT, POST"
                    }
                }
            );
            return response;
        } catch (err) {
            return err;
        }
    };


    render() {
        const {classes} = this.props;
        const {formData, error, success, loading} = this.state;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
        });
        return (
            <React.Fragment>
                <MuiThemeProvider theme={muitheme}>
                    <CssBaseline/>
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar} color="primary" src={vispIcon}/>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <ValidatorForm
                                ref="form"
                                onSubmit={this.handleSubmit}
                                className={classes.form}
                            >
                                <TextValidator
                                    label="Username*"
                                    onChange={this.handleChange}
                                    name="username"
                                    value={formData.username}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    fullWidth
                                />
                                <br/>
                                <br/>
                                <TextValidator
                                    label="Password*"
                                    onChange={this.handleChange}
                                    name="password"
                                    value={formData.password}
                                    validators={['required']}
                                    type="password"
                                    errorMessages={['this field is required']}
                                    fullWidth
                                />
                                <br/>
                                {error !== "" ? (
                                    <FormLabel component="legend" error={true}>
                                        <br/>
                                        {error}
                                    </FormLabel>
                                ) : (
                                    ""
                                )}
                                <br/>
                                <FormControlLabel
                                    control={<Checkbox value="remember"
                                                       color='primary'
                                                       checked={formData.remember}
                                                       onChange={this.handleCheckBoxChange}/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                    color="primary"
                                    className={buttonClassname}
                                >
                                    Sign in
                                </Button>
                                {loading && <LinearProgress
                                    classes={{
                                        colorPrimary: classes.colorPrimary,
                                        barColorPrimary: classes.barColorPrimary
                                    }}/>}
                            </ValidatorForm>
                        </Paper>
                    </main>
                </MuiThemeProvider>)
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Login));