import React from "react";
import MUIDataTable from "mui-datatables";
import TextField from '@material-ui/core/TextField';
import {ImportDataContext} from "../../context/ImportDataProvider";
import Typography from "@material-ui/core/Typography/Typography";


function setColumns(importTableHeader) {
    let columns = [];
    for (const columnLabel of importTableHeader) {
        const column = {
            name: columnLabel,
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <TextField
                            id={tableMeta.columnIndex.toString()}
                            error={value === ""}
                            defaultValue={value}
                            variant="outlined"
                            required={true}
                            style={{width: 200}}
                        />
                    );
                }
            }
        };
        columns.push(column);
    }
    return columns;
}

class ReviewDataTable extends React.Component {
    render() {
        return (
            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> Context should not be empty! </Typography></div>);
                    return (
                        <MUIDataTable
                            title={"Review list"}
                            data={context.importTableRows}
                            columns={setColumns(context.importTableHeader)}
                            options={{
                                responsive: "scroll",
                                onRowsDelete: (rowsDeleted) => {
                                    context.removeRowImportTable(rowsDeleted);
                                }
                            }}
                        />
                    )
                }}
            </ImportDataContext.Consumer>
        );
    }
}


export default ReviewDataTable;
