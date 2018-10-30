import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";


class CustomFooter extends React.Component {
    render() {
        const {count} = this.props;
        return (
            <TableFooter>
                <TableRow>
                    <TableCell>Total count: {count}</TableCell>
                </TableRow>
            </TableFooter>
        );
    }
}

CustomFooter.propTypes = {
    count: PropTypes.number
};

export default CustomFooter;
