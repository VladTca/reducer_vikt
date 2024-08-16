import type {Meta, StoryObj} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./AppWithRedux";
import {v1} from "uuid";
import {Task} from "./Task";


// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],

    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

    decorators:[ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;


// const Task=()=>{
//     const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
//     if (!task) task= {id: v1(), title: "Default Task", isDone: true}
//     return <Task task={task} id={'todolistId1'}/>
// }
// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    render: () => <Task task={useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])} id={'todolistId1'}/>,
};

