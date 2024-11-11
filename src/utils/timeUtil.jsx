export const getFormattedCurrentTime = () => {
    return new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).replace(",", " ");
};
