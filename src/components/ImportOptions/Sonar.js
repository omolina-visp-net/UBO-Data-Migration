import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});


class Sonar extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    defaultValue=""
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    defaultValue=""
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    type="password"
                />
            </form>
        );
    }
}

Sonar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sonar);