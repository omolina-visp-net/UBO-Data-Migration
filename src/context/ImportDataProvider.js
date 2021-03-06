import React from "react";
import customerFields from "../data/customer_fields";
import packageFields from "../data/package_fields";
import csv from 'csv';
import {GET_SONAR_CUSTOMERS} from '../graphql/quries'

const defaultEntity = {
    name: "Customers",
    key: "customer",
    icon: "SupervisorAccountIcon"
};

const defaultValues = {
    uboFields: customerFields.fields,
    importData: [],
    selectedOption: 0,
    activeStep: 0,
    success: false,
    fileName: '',
    sonarInputs: {
        subdomain: '',
        username: '',
        password: '',
        validated: false,
    },
    buttonNextEnabled: false,
    loading: false,
    errorMessage: '',
    dataMap: {},
    importTableHeader: [],
    importTableRows: [],
    activeImport: false,
    entity: defaultEntity,
    nextEntity: {},
    openDialog: false
}

export const ImportDataContext = React.createContext();

export default class ImportDataProvider extends React.Component {
    state = {...defaultValues};

    setActiveImport = (status) => {
        this.setState({activeImport: status});
    };

    handleCloseDialog = (action) => event => {
        this.setState(prevState => {
            return {
                openDialog: !prevState.openDialog,
                activeImport: !action,
                entity: action ? prevState.nextEntity : prevState.entity
            }
        }, () => {
            if (action) {
                this.setState(prevState => {
                    return {...defaultValues, entity: prevState.nextEntity}
                }, async () => {
                    //Initialize ubo map fields
                    await this.initMapFields(this.state.entity);
                });
            }
        });
    };

    handleSelectedEntity = selectedEntity => () => {
        const {activeImport, success} = this.state;
        if (!activeImport && !success) {
            this.setState({entity: selectedEntity, nextEntity: {}}, async () => {
                //Initialize ubo map fields
                await this.initMapFields(this.state.entity);
            });
        } else if (success) {
            this.setState(prevState => {
                return {...defaultValues, entity: prevState.nextEntity}
            }, async () => {
                //Initialize ubo map fields
                await this.initMapFields(this.state.entity);
            });
        } else {
            const {entity} = this.state;
            if (selectedEntity.key !== entity.key) {
                this.setState(prevState => {
                    return {
                        openDialog: !prevState.openDialog,
                        nextEntity: selectedEntity
                    };
                }, async () => {
                    //Initialize ubo map fields
                    await this.initMapFields(this.state.entity);
                });
            }
        }
    };


    handleSonarInputChange = name => event => {
        const newSonarInputs = {...this.state.sonarInputs, [name]: event.target.value};
        this.setState({
            sonarInputs: newSonarInputs
        }, () => {
            const {subdomain, username, password} = this.state.sonarInputs;
            const updatedSOnarInputs = {
                ...this.state.sonarInputs,
                validated: (subdomain !== '' && username !== '' && password !== '')
            };
            this.setState({
                sonarInputs: updatedSOnarInputs,
                activeImport: true
            }, () => {
                this.enableNextButton();
            });
        });
    };

    handleUploadEvent = event => {
        const file = event.target.files[0];
        if (file) {
            const fileNameTemp = file.name;
            this.setState({fileName: fileNameTemp});
            const reader = new FileReader();
            reader.onload = async () => {
                if (!reader.result) {
                } else {
                    csv.parse(reader.result, {columns: true}, (err, data) => {
                        if (err) {
                        } else {
                            this.setState({
                                    importData: data,
                                    importTableRows: [],
                                    importTableHeader: [],
                                    activeImport: true
                                },
                                () => {
                                    this.enableNextButton();
                                });
                        }
                    });

                }
            };
            reader.readAsBinaryString(event.target.files[0]);
        }
    };

    setImportData = (data) => {
        this.setState({importData: data, loading: false});
    };

    updateImportData = (updatedRow) => {
        const {rows} = this.state;
        const foundIndex = rows.findIndex(row => row.id === updatedRow.id);
        rows[foundIndex] = updatedRow;
        this.setState({rows});
    };

    setSelectedOption = event => {
        this.setState({selectedOption: parseInt(event.target.value)}, () => {
            this.enableNextButton();
        })
    };

    fetchedSonarCustomers = async (client) => {
        const {data, error} = await client.query({
            query: GET_SONAR_CUSTOMERS
        });

        if (error) {
            this.setState({errorMessage: JSON.stringify(error)});
        } else {
            this.setImportData(data.sonarCustomers);
        }

    };

    initMapFields = async (entity) => {
        const {key} = entity;
        let entityFields = [];
        switch (key) {
            case "customer":
                entityFields = customerFields.fields;
                break;
            case "package":
                entityFields = packageFields.fields;
                break;
            default:
            // ?
        }
        if (entityFields.length) {
            this.setState({uboFields: entityFields}, async () => {
                await this.state.uboFields.map(async uboField => {
                    await this.initDataMap(uboField.key, "");
                });
            })
        }
    };

    handleNext = (client,) => event => {
        this.setState(state => ({
            buttonNextEnabled: false,
            activeStep: state.activeStep + 1,
            loading: true,
            activeImport: true,
        }), async () => {
            if (this.state.selectedOption === 1 && this.state.activeStep === 1) {
                await this.fetchedSonarCustomers(client);
            } else if (this.state.activeStep === 2) {
                await this.initImportTable();
            } else {
                setTimeout(() => {
                    this.setState({loading: false});
                }, 1000);
            }
        });

        const {activeStep} = this.state;
        const steps = this.steps();
        if (activeStep === steps.length - 1) {
            this.setState({success: true});
        }
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }), () => {
            this.enableNextButton();
        });
    };

    steps = () => {
        return ['IMPORT OPTION ', 'MAP DATA', 'IMPORT'];
    };

    enableNextButton = () => {
        const {importData, selectedOption, sonarInputs, activeStep, dataMap} = this.state;

        switch (selectedOption) {
            case 0:
                this.setState({buttonNextEnabled: importData.length > 0});
                break;
            case 1:
                this.setState({
                    buttonNextEnabled: (sonarInputs.validated && !activeStep) ||
                        (activeStep === 1 && !importData && importData.length > 0)
                });
                break;
            case 2:
                //TODO
                break;
            default:
        }

        let enable = true;
        switch (activeStep) {
            case 1:
                for (const key of Object.keys(dataMap)) {
                    const value = dataMap[key];
                    if (!value) {
                        enable = false;
                        break;
                    }
                }
                this.setState({buttonNextEnabled: enable});
                break;
            case 2:
                const {importTableRows} = this.state;
                for (let rows of importTableRows) {
                    const hasEmptyValue = rows.includes("");
                    if (hasEmptyValue) {
                        enable = false;
                        break;
                    }
                }
                this.setState({buttonNextEnabled: enable});
                break;

            default:
            //TODO
        }

    };

    updateDataMap = async (uboFiedKey, dataImportField) => {
        const _dataMap = {...this.state.dataMap, [uboFiedKey]: dataImportField};
        this.setState({dataMap: _dataMap, importTableHeader: [], importTableRows: []}, () => {
            this.enableNextButton();
        });
    };

    initDataMap = async (uboFiedKey, dataImportField) => {
        if (uboFiedKey) {
            let _dataMap = this.state.dataMap;
            _dataMap[uboFiedKey] = dataImportField;
            this.setState({dataMap: _dataMap});
        }
    };

    initImportTable() {
        const {dataMap, uboFields, importData} = this.state;
        const dataMapKeysArray = Object.keys(dataMap);
        let columnHeader = [], rows = [];
        for (const key of dataMapKeysArray) {
            const uboField = uboFields.filter(uboField => uboField.key === key);
            const columnName = uboField[0].label;
            columnHeader.push(columnName);
        }

        for (let importRow of importData) {
            let row = [];
            for (let uboField of uboFields) {
                const key = uboField.key
                const columnNameMap = dataMap[key];
                row.push(importRow[columnNameMap]);
            }
            rows.push(row);
        }
        this.setState({importTableHeader: columnHeader, importTableRows: rows, loading: false}, () => {
            this.enableNextButton();
        });
    }

    removeRowImportTable = (rowsDeleted) => {
        const _importTableRows = this.state.importTableRows;
        this.setState({importTableRows: []}, () => {
            let rowsDeletedList = [];
            for (let row of rowsDeleted.data) {
                rowsDeletedList.push(_importTableRows[row.index]);
            }
            let newImportTableRows = _importTableRows;
            for (let rowDeleted of rowsDeletedList) {
                newImportTableRows = newImportTableRows.filter(row => row !== rowDeleted);
            }
            this.setState({importTableRows: newImportTableRows}, () => {
                this.enableNextButton();
            });
        });
    };

    updateRowImportTable = (rowIndex, columnIndex, value) => {
        let _importTableRows = this.state.importTableRows;
        let dataRow = _importTableRows[rowIndex];
        dataRow[columnIndex] = value;
        _importTableRows[rowIndex] = dataRow;
        this.setState({importTableRows: _importTableRows}, () => {
            this.enableNextButton();
        })
    };

    render() {
        return (
            <ImportDataContext.Provider
                value={{
                    state: this.state,
                    steps: this.steps(),
                    setImportData: this.setImportData,
                    updateImportData: this.updateImportData,
                    setSelectedOption: this.setSelectedOption,
                    handleUploadEvent: this.handleUploadEvent,
                    handleNext: this.handleNext,
                    handleBack: this.handleBack,
                    handleSonarInputChange: this.handleSonarInputChange,
                    updateDataMap: this.updateDataMap,
                    removeRowImportTable: this.removeRowImportTable,
                    updateRowImportTable: this.updateRowImportTable,
                    handleSelectedEntity: this.handleSelectedEntity,
                    setActiveImport: this.setActiveImport,
                    handleCloseDialog: this.handleCloseDialog,
                }}
            >
                {this.props.children}
            </ImportDataContext.Provider>
        );
    }
}
