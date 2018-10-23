import React from "react";

export const IspContext = React.createContext();
export default class IspProvider extends React.Component {
    state = {
        ispId: localStorage.getItem("Importer.selectedIspId"),
        ispIdList: JSON.parse(localStorage.getItem("Importer.ispId"))
    };

    setIspId = ispId => {
        localStorage.setItem("Importer.selectedIspId", ispId);
        this.setState({ispId});
    };

    render() {
        return (
            <IspContext.Provider
                value={{
                    state: this.state,
                    setIspId: this.setIspId
                }}
            >
                {this.props.children}
            </IspContext.Provider>
        );
    }
}
