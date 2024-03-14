export const useAlert = () => {
    const showAlert = (message: string) => {
        window.alert(message);
    };

    const showConfirm = (message: string, onConfirm: () => void) => {
        if (window.confirm(message)) {
            onConfirm();
        }
    };

    return { showAlert, showConfirm };
};