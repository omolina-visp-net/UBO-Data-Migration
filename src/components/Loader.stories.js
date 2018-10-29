import React from "react"
import {storiesOf} from "@storybook/react"
import StoryRouter from 'storybook-react-router';
import Loader from "./Loader";


storiesOf('Loader', module)
    .addDecorator(StoryRouter())
    .add('default', () => <Loader/>)
