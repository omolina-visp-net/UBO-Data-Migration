import React from "react";
import customerFields from "../data/customer_fields";
import csv from 'csv';
import gql from "graphql-tag";

const GET_SONAR_CUSTOMERS = gql`{
    sonarCustomers(domain: "tekwav", username: "datasync", password: "Datasync!123") {
        Id
        FirstName
        LastName
        Username
        BalanceTotal
        AddressLine1
        AddressLine2
        City
        State
        EmailAddress
        MobilePhone
        WorkPhone
        HomePhone
        Fax
    }
}
`;

export const ImportDataContext = React.createContext();
export default class ImportDataProvider extends React.Component {
    state = {
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
        errorMessage: ''
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
                csv.parse(reader.result, {columns: true}, (err, data) => {
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
        this.setState({importData: data, loading: false});
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

    fetchedSonarCustomers = async (client) => {
        const {data, error} = await client.query({
            query: GET_SONAR_CUSTOMERS
        });

        if (error) {
            this.setState({errorMessage: JSON.stringify(error)});
        } else {
            this.setImportData(data.sonarCustomers);
        }

    }


    handleNext = (client) => event => {
        console.log(this.state.selectedOption);
        this.setState(state => ({
            activeStep: state.activeStep + 1,
            loading: true
        }), async () => {
            if (this.state.selectedOption === 1) {
                await this.fetchedSonarCustomers(client);
            }
        });

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
        const {activeStep, selectedOption, importData, fileName, buttonNextEnabled, sonarInputs, uboFields, loading} = this.state;
        return (
            <ImportDataContext.Provider
                value={{
                    activeStep,
                    selectedOption,
                    importData,
                    fileName,
                    buttonNextEnabled,
                    sonarInputs,
                    uboFields,
                    loading,
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
