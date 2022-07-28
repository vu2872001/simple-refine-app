

export const UndoableNotification = ({
    closeToast,
    cancelMutation,
    message,
}) => {
    return (
        <div>
            <p>{message}</p>
            <button
                onClick={() => {
                    cancelMutation?.();
                    closeToast?.();
                }}
            >
                Undo
            </button>
        </div>
    );
};