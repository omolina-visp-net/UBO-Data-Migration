import React from "react";
import MUIDataTable from "mui-datatables";
import {ImportDataContext} from "../../context/ImportDataProvider";
import Typography from "@material-ui/core/Typography/Typography";
import CellTextField from "./CellTextField";
import CustomFooter from "./CustomFooter";

class ReviewDataTable extends React.Component {
    columns = (importTableHeader) => {
        let columns = [];
        for (const columnLabel of importTableHeader) {
            const column = {
                name: columnLabel,
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <CellTextField
                                index={tableMeta.columnIndex}
                                tableMeta={tableMeta}
                                value={value}
                                change={event => updateValue(event)}
                            />
                        );
                    }
                }
            };
            columns.push(column);
        }
        return columns;
    }

    render() {
        return (
            <ImportDataContext.Consumer>
                {context => {
                    if (!context) return (<div><Typography> Context should not be empty! </Typography></div>);
                    const {importTableRows, importTableHeader} = context;
                    return (
                        <MUIDataTable
                            title={"Review import list"}
                            data={importTableRows}
                            columns={this.columns(importTableHeader)}
                            options={{
                                filter: true,
                                filterType: "dropdown",
                                responsive: "scroll",
                                rowsPerPage: importTableRows.length,
                                onRowsDelete: (rowsDeleted) => {
                                    context.removeRowImportTable(rowsDeleted);
                                },
                                sort: false,
                                customFooter: (
                                    count,
                                    page,
                                    rowsPerPage,
                                    changeRowsPerPage,
                                    changePage
                                ) => {
                                    return <CustomFooter count={count}/>;
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
