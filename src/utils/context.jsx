import React, { createContext, useContext, useState, useCallback } from "react";

const ActiveContext = createContext(null);

export const useActive = () => {
    return useContext(ActiveContext);
};

export const ActiveProvider = ({ children }) => {
    const [active, setActive] = useState({}); // Track active and visible status per app

    const [showApplications, setShowApplications] = useState(false);

    // Function to toggle an icon: activates if not present, deactivates if present
    const toggleIconNavbar = useCallback((iconLabel) => {
        setActive((prev) => {
            const currentState = prev[iconLabel];

            if (!currentState) {
                return {
                    ...prev,
                    [iconLabel]: { active: true, visible: true },
                };
            }

            return {
                ...prev,
                [iconLabel]: {
                    ...currentState,
                    visible: currentState.visible ? (showApplications ? currentState.visible : false) : true,
                },
            };
        });
        setShowApplications(false);
    }, [showApplications]);

    const toggleIcon = useCallback((iconLabel) => {
        setActive((prev) => {
            const currentState = prev[iconLabel];

            if (!currentState) {
                return {
                    ...prev,
                    [iconLabel]: { active: true, visible: true },
                };
            }

            return {
                ...prev,
                [iconLabel]: { ...currentState, visible: currentState.visible || true },
            };
        });
        setShowApplications(false);
    }, []);

    // Function to remove a specific iconLabel
    const removeIcon = useCallback((iconLabel) => {
        setActive((prev) => {
            const newState = { ...prev };
            delete newState[iconLabel];
            return newState;
        });
    }, []);

    // Function to toggle application visibility
    const toggleApplications = useCallback(() => {
        setShowApplications((prev) => !prev);
    }, []);

    // Function to minimize an app by setting its visibility to false
    const minimizeApp = useCallback((iconLabel) => {
        setActive((prev) => ({
            ...prev,
            [iconLabel]: {
                ...prev[iconLabel],
                visible: false,
            }
        }));
    }, []);

    // Function to restore a minimized app by setting its visibility to true
    const restoreApp = useCallback((iconLabel) => {
        setActive((prev) => ({
            ...prev,
            [iconLabel]: {
                ...prev[iconLabel],
                visible: true,
            }
        }));
    }, []);

    return (
        <ActiveContext.Provider value={{
            active,
            toggleIconNavbar,
            toggleIcon,
            removeIcon,
            showApplications,
            toggleApplications,
            minimizeApp,
            restoreApp
        }}>
            {children}
        </ActiveContext.Provider>
    );
};
