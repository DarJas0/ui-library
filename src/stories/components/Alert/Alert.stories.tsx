import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from '../../../../lib/components/Alert/Alert';

const meta: Meta<typeof Alert> = {
    title : "UI/Alert",
    component: Alert,
    tags: ["autodocs"],
    argTypes: {
        title: {
            control: "text",
        },
        children: {
            control: "text",
            description: "The content of the alert",
        },
        variant: {
            control: "select",
            options: ["info", "success", "warning", "error", "neutral"],
            description: "The visual style of the alert"
        },
    },
    args: {
        title: "Information",
        children: "This is a new feature available for all users.",
        variant: "info",
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const InfoAlert: Story = {};

export const SuccessAlert: Story = {
    args: {
        variant: "success",
        title: "Success",
        children: "Your changes have been saved successfully.",
    },
};

export const WarningAlert: Story = {
    args: {
        variant: "warning",
        title: "Warning",
        children: "Your subscription is about to expire.",
    },
};

export const ErrorAlert: Story = {
    args: {
        variant: "error",
        title: "Error",
        children: "Something went wrong while processing your request.",
    },
};

export const NeutralAlert: Story = {
    args: {
        variant: "neutral",
        title: "Note",
        children: "This is a neutral note for your information.",
    },
};

export const Dismissible: Story = {
    render: (args) => {
        const [open, setOpen] = React.useState(true);
        if (!open) return <div className="text-sm text-gray-500 italic">Alert dismissed. Refresh to see again.</div>;
        return (
            <Alert
                {...args}
                dismissible
                onClose={() => setOpen(false)}
            />
        );
    },
    args: {
        title: "Dismissible Alert",
        children: "You can dismiss this alert by clicking the X icon.",
        variant: "info",
    },
};