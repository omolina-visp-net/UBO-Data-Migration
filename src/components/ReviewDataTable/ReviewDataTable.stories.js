import React from "react"
import {storiesOf} from "@storybook/react"
import StoryRouter from 'storybook-react-router';
import ReviewDataTable from "./ReviewDataTable";


storiesOf('Review data table', module)
    .addDecorator(StoryRouter())
    .add('Table', () => <ReviewDataTable/>)
