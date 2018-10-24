import React from "react"
import {storiesOf} from "@storybook/react"
import StoryRouter from 'storybook-react-router';
import MapDataTable from "./MapDataTable";
import ReactSelect from "./ReactSelect";

function createData(uboFieldName, otherFieldName, isValid) {
    return {uboFieldName, otherFieldName, isValid};
}

const rows = [
    createData('Username', "Username", true),
    createData('Password', 'Password', true),
    createData('First Name', 'First Name', false),
    createData('Last Name', 'Last Name', true),
    createData('Address Line 1', 'Address Line 1', false),
    createData('Address Line 2', 'Address Line 2', false),
    createData('City', 'City', false),
    createData('State', 'State', false),
    createData('Email Address', 'Email Address', false),
    createData('Mobile Phone', 'Mobile Phone', false),
    createData('Work Phone', 'Work Phone', false),
    createData('Home Phone', 'Home Phone', false),
    createData('Fax', 'Fax', false),
];


storiesOf('Map data table', module)
    .addDecorator(StoryRouter())
    .add('Table', () => <MapDataTable/>)
    .add('Select', () => <ReactSelect rows={rows}/>);
