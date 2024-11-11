import React, { createContext, useContext, useState } from "react";

const ActiveContext = createContext(null);

export const useActive = () => {
    return useContext(ActiveContext);
};

export const ActiveProvider = ({ children }) => {
    const [active, setActive] = useState({}); // Track active and visible status per app

    const [showApplications, setShowApplications] = useState(false);

    // Function to toggle an icon: activates if not present, deactivates if present
    const toggleIconNavbar = (iconLabel) => {
        setActive((prev) => {
            const currentState = prev[iconLabel];

            if (!currentState) {
                // If the iconLabel doesn't exist, add it with active: true and visible: true
                return {
                    ...prev,
                    [iconLabel]: {
                        active: true,
                        visible: true,
                    },
                };
            }

            // If the iconLabel exists, toggle the visibility state
            return {
                ...prev,
                [iconLabel]: {
                    ...currentState,
                    visible: currentState.visible
                        ? (showApplications ? currentState.visible : false)  // If visible, set to false if showApplications is false
                        : true, // If visible is false, set it to true
                },
            };
        });
        setShowApplications(false);
    };

    const toggleIcon = (iconLabel) => {
        setActive((prev) => {
            const currentState = prev[iconLabel];

            if (!currentState) {
                // If the iconLabel doesn't exist, add it with active: true and visible: true
                return {
                    ...prev,
                    [iconLabel]: {
                        active: true,
                        visible: true,
                    },
                };
            }

            // If the iconLabel exists, toggle the visibility state
            return {
                ...prev,
                [iconLabel]: {
                    ...currentState,
                    visible: currentState.visible ? currentState.visible : true, // Toggle visibility to true only
                },
            };
        });
        setShowApplications(false);
    };

    // Function to remove a specific iconLabel
    const removeIcon = (iconLabel) => {
        setActive((prev) => {
            const newState = { ...prev };  // Create a copy of the previous state
            delete newState[iconLabel];    // Remove the icon from the state
            return newState;
        });
    };

    // Function to toggle application visibility
    const toggleApplications = () => {
        setShowApplications(!showApplications);
    };

    // Function to minimize an app by setting its visibility to false
    const minimizeApp = (iconLabel) => {
        setActive((prev) => ({
            ...prev,
            [iconLabel]: {
                ...prev[iconLabel],
                visible: false,
            }
        }));
    };

    // Function to restore a minimized app by setting its visibility to true
    const restoreApp = (iconLabel) => {
        setActive((prev) => ({
            ...prev,
            [iconLabel]: {
                ...prev[iconLabel],
                visible: true,
            }
        }));
    };

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
}
