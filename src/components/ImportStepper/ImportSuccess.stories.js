import React from "react"
import {storiesOf} from "@storybook/react"
import StoryRouter from 'storybook-react-router';
import ImportSuccess from "./ImportSuccess";


storiesOf('Success Page', module)
    .addDecorator(StoryRouter())
    .add('Main', () => <ImportSuccess/>);
