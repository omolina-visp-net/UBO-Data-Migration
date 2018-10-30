import React from "react";
import TextField from '@material-ui/core/TextField';
import {ImportDataContext} from "../../context/ImportDataProvider";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";

class CellTextField extends React.Component {
    state = {
        textValue: ""
    }

    componentDidMount() {
        const {value} = this.props;
        this.setState({textValue: value});
    }

    handleOnChange = (context) => event => {
        this.setState({textValue: event.target.value});
        const {tableMeta} = this.props;
        context.updateRowImportTable(tableMeta.rowIndex, tableMeta.columnIndex, event.target.value);
    }

    render() {
        const {tableMeta, value, change} = this.props;
        const {textValue} = this.state;
        return (
            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> Context should not be empty! </Typography></div>);
                    return (
                        <TextField
                            id={`${tableMeta.rowIndex.toString()}${tableMeta.columnIndex.toString()}`}
                            error={textValue === ""}
                            defaultValue={value}
                            variant="outlined"
                            required={true}
                            style={{width: 200}}
                            onChange={event => change(event.target.value, tableMeta.columnIndex)}
                        />
                    )
                }}
            </ImportDataContext.Consumer>
        );
    }
}

CellTextField.propTypes = {
    value: PropTypes.string.isRequired,
    tableMeta: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired
};

export default CellTextField;
