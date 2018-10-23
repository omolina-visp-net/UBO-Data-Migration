import React from "react"
import {storiesOf} from "@storybook/react"
import StoryRouter from 'storybook-react-router';
import Login from "./Login";


storiesOf('Login', module)
	.addDecorator(StoryRouter())
	.add('Form', () => <Login />);