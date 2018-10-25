import React from "react";
import customerFields from "../data/customer_fields";
import csv from 'csv';

export const ImportDataContext = React.createContext();
export default class ImportDataProvider extends React.Component {
    state = {
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
        buttonNextEnabled: false
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
                sonarInputs: updatedSOnarInputs
            }, () => {
                this.enableNextButton();
            });
        });
    };

    handleUploadEvent = event => {
        const fileNameTemp = event.target.files[0].name;
        this.setState({fileName: fileNameTemp});
        const reader = new FileReader();
        reader.onload = async () => {
            if (!reader.result) {
                console.log({error: "No file uploaded!"});
            } else {
                csv.parse(reader.result, (err, data) => {
                    if (err) {
                        console.log({error: "Error parsing csv file!"});
                    } else {
                        this.setState({importData: data}, () => {
                            this.enableNextButton();
                            console.log({importData: this.state.importData});
                        });
                    }
                });
            }
        };
        reader.readAsBinaryString(event.target.files[0]);
    }

    setImportData = (data) => {
        this.setState({importData: data});

    }

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
    }


    mapFields = () => {
        let mapFields = [];
        const {selectedOption} = this.state;
        switch (selectedOption) {
            case 0:
                mapFields = customerFields.fields;
                break;
            case 1:
                mapFields = [];
                break;
            default:
        }
        return mapFields;
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));

        const {activeStep} = this.state;
        const steps = this.steps();
        if (activeStep === steps.length - 1) {
            this.setState({success: true});
            setTimeout(() => {
                this.props.handleClose();
            }, 1000);
        }
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    steps = () => {
        return ['IMPORT OPTION ', 'MAP DATA', 'IMPORT'];
    }

    enableNextButton = () => {
        const {importData, selectedOption, sonarInputs, activeStep} = this.state;

        switch (selectedOption) {
            case 0:
                console.log({activeStep});
                this.setState({buttonNextEnabled: importData.length > 0});
                break;
            case 1:
                this.setState({
                    buttonNextEnabled: (sonarInputs.validated && !activeStep) ||
                        (activeStep === 1 && !importData && importData.length > 0)
                });
                // TODO
                break;
            default:
        }

    }

    render() {
        const {activeStep, selectedOption, importData, fileName, buttonNextEnabled, sonarInputs} = this.state;
        return (
            <ImportDataContext.Provider
                value={{
                    activeStep,
                    selectedOption,
                    importData,
                    fileName,
                    buttonNextEnabled,
                    sonarInputs,
                    mapFields: this.mapFields(),
                    steps: this.steps(),
                    setImportData: this.setImportData,
                    updateImportData: this.updateImportData,
                    setSelectedOption: this.setSelectedOption,
                    handleUploadEvent: this.handleUploadEvent,
                    handleNext: this.handleNext,
                    handleBack: this.handleBack,
                    handleSonarInputChange: this.handleSonarInputChange
                }}
            >
                {this.props.children}
            </ImportDataContext.Provider>
        );
    }
}
