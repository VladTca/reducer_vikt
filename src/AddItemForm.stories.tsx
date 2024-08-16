import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import {fn} from "@storybook/test";
import {action} from "@storybook/addon-actions";
import {memo} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button click inside form',
            // action: 'clicked',
        },

    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        addItem: fn()
    },
};


export default meta;
type Story = StoryObj<typeof meta>;


export const AddItemFormStory: Story = {
  // args:{
  //     addItem:action(
  // 'Button click inside form')
  // }
}

export const AddItemFormErrorStory: Story = {
 render: (args) => <AddItemForm addItem={args.addItem}/>,
}

