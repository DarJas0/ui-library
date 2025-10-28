import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
    title : "Alert",
    component: Alert,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                "Ein Alert, welcher aufpoppt",
            },
        },
    },
    argTypes: {
        title: {
            control: "text",
        },
        children: {
            control: "text",
            description: "Der sichtbare Text im Alert",
        },
        variant: {
            control: "inline-radio",
            options: ["info", "success", "warning", "error"],
            description: "Legt fest, um welche Variante des Alerts es sich handelt"
        },
    },
    args: {
        title: "Alert",
        children: "Das ist ein Test Alert",
        variant: "info",
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const InfoAlert: Story = {};

export const SuccessAlert: Story = {
    args: {variant: "success"},
};

export const WarningAlert: Story = {
    args: {variant: "warning"},
};

export const ErrorAlert: Story = {
    args: {variant: "error"},
};

export const Dismissible: Story = {
    render: (args) => {
        const [open, setOpen] = React.useState(true);
        if (!open) return <></>;
        return (
            <Alert
                {...args}
                dismissible
                onClose={() => setOpen(false)}
            />
        );
    },
    args: {
        title: "Heads up",
        children: "Du kannst den Alert rechts wegclicken",
        variant: "info",
    },
};