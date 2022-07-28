import React from "react";
import { toast } from "react-toastify";
import { UndoableNotification } from "components/custom";

export const notificationProvider = {
    open: ({ key, message, type, undoableTimeout, cancelMutation }) => {
        if (type === "progress") {
            if (toast.isActive(key)) {
                toast.update(key, {
                    progress: undoableTimeout && (undoableTimeout / 10) * 2,
                    render: (
                        <UndoableNotification
                            message={message}
                            cancelMutation={cancelMutation}
                        />
                    ),
                    type: "default",
                });
            } else {
                toast(
                    <UndoableNotification
                        message={message}
                        cancelMutation={cancelMutation}
                    />,
                    {
                        toastId: key,
                        updateId: key,
                        closeOnClick: false,
                        closeButton: false,
                        autoClose: false,
                        progress: undoableTimeout && (undoableTimeout / 10) * 2,
                    },
                );
            }
        } else {
            if (toast.isActive(key)) {
                toast.update(key, {
                    render: message,
                    closeButton: true,
                    autoClose: 3000,
                    type,
                });
            } else {
                toast(message, {
                    toastId: key,
                    type,
                });
            }
        }
    },
    close: (key) => toast.dismiss(key),
};
