import React from "react";

export const EntityContext = React.createContext();

const entities = ['Subscribers', 'Packages'];


export default class EntityProvider extends React.Component {
    state = {
        selectedEntityIndex: entities[0]
    };

    setSelectedEntity = index => {
        this.setState({selectedEntityIndex: index});
        console.log("setSelectedEntity", entities[index]);
    };

    getSelectedEntity = () => {
        const {selectedEntityIndex} = this.state;
        return entities[selectedEntityIndex];
    }

    getEntities = () => {
        return entities;
    }

    render() {
        return (
            <EntityContext.Provider
                value={{
                    state: this.state,
                    setSelectedEntity: this.setSelectedEntity,
                    selectedEntity: this.getSelectedEntity(),
                    entities: this.getEntities
                }}
            >
                {this.props.children}
            </EntityContext.Provider>
        );
    }
}
