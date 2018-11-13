import React from "react"
import {storiesOf} from "@storybook/react"
import StoryRouter from 'storybook-react-router';
import Home from "./Home.old";
import EntityProvider from "../../context/EntityProvider";


const data = [];

storiesOf('Home', module)
    .addDecorator(StoryRouter())
    .add('Import', () => <EntityProvider><Home/> </EntityProvider>);