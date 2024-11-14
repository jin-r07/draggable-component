import React from "react";
import chromeIcon from "../../assets/icons/google-chrome.svg";
import calculatorIcon from "../../assets/icons/pcbcalculator.svg";
import fileIcon from "../../assets/icons/default-user-home.svg";
import terminalIcon from "../../assets/icons/terminal.svg";
import spotifyIcon from "../../assets/icons/spotify-client.svg";
import settingsIcon from "../../assets/icons/application-default-icon.svg";
import trashIcon from "../../assets/icons/user-trash-full.svg";
import gmailIcon from "../../assets/icons/gmail.svg";
import { CgMenuGridO } from "react-icons/cg";
import { useActive } from "../../utils/context";

export default function LeftNavbar({ className, ...props }) {
    const { active = [], toggleIconNavbar, showApplications, setShowApplications } = useActive() || {};

    const icons = [
        { label: "Google Chrome", icon: chromeIcon, for: "google_chrome" },
        { label: "Calculator", icon: calculatorIcon, for: "calculator" },
        { label: "About Me", icon: fileIcon, for: "about_me" },
        { label: "Terminal", icon: terminalIcon, for: "terminal" },
        { label: "Spotify", icon: spotifyIcon, for: "spotify" },
        { label: "Settings", icon: settingsIcon, for: "settings" },
    ];

    // Get the order of special icons based on their active state
    const specialIcons = [];
    if (active.contact?.active) {
        specialIcons.push({ label: "Contact Me", icon: gmailIcon, for: "contact" });
    }
    if (active.trash?.active) {
        specialIcons.push({ label: "Trash", icon: trashIcon, for: "trash" });
    }

    // Render the special icons with the correct order
    const orderedSpecialIcons = specialIcons.sort((a, b) => {
        // Get the positions of a.for and b.for in the active object
        const indexA = Object.keys(active).indexOf(a.for);
        const indexB = Object.keys(active).indexOf(b.for);

        return indexA - indexB;
    });

    return (
        <React.Fragment>
            <nav className={`${className} bg-black bg-opacity-20 xl:w-[3vw] w-12 flex flex-col items-center xl:pt-[3.5vh] pt-6 z-30 font-DMSans`} {...props}>
                {/* Render the default icons */}
                {icons.map((item, index) => (
                    <div key={index} className="relative text-white flex flex-col items-center group xl:text-[0.8vw] text-xs xl:mb-[0.5vh] mb-1">
                        <div
                            className={`relative xl:w-[2.5vw] w-10 xl:h-[4.5vh] h-10 bg-white bg-opacity-0 hover:bg-opacity-20 xl:rounded-[0.3vw] rounded-md ${active[item.for]?.active ? "bg-opacity-20" : ""}`}
                            onClick={() => toggleIconNavbar(item.for)}
                        >
                            {/* Red dot for active state */}
                            {active[item.for]?.active && (
                                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 xl:w-[0.3vw] w-1 xl:h-[0.5vh] h-1 bg-red-500 rounded-full" />
                            )}
                            <img
                                src={item.icon}
                                alt={item.label}
                                className="object-contain xl:p-[0.3vw] p-1 w-full h-full"
                            />
                        </div>
                        {/* Tooltip Label */}
                        <span className="absolute left-full top-1/2 transform -translate-y-1/2 xl:ml-[0.8vw] ml-3 whitespace-nowrap bg-black text-white pointer-events-none xl:p-[0.4vw] p-1 leading-none xl:rounded-[0.3vw] rounded-sm opacity-0 group-hover:opacity-100">
                            {item.label}
                        </span>
                    </div>
                ))}

                {/* Render the special icons (Trash and Contact) in correct order */}
                {orderedSpecialIcons.map((item, index) => (
                    <div key={index} className="relative text-white flex flex-col items-center group xl:text-[0.8vw] text-xs xl:mb-[0.5vh] mb-1">
                        <div
                            className={`relative xl:w-[2.5vw] w-10 xl:h-[4.5vh] h-10 bg-white bg-opacity-0 hover:bg-opacity-20 xl:rounded-[0.3vw] rounded-md ${active[item.for]?.active ? "bg-opacity-20" : ""}`}
                            onClick={() => toggleIconNavbar(item.for)}
                        >
                            {/* Red dot for active state */}
                            {active[item.for]?.active && (
                                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 xl:w-[0.3vw] w-1 xl:h-[0.5vh] h-1 bg-red-500 rounded-full" />
                            )}
                            <img
                                src={item.icon}
                                alt={item.label}
                                className="object-contain xl:p-[0.3vw] p-1 w-full h-full"
                            />
                        </div>
                        {/* Tooltip Label */}
                        <span className="absolute left-full top-1/2 transform -translate-y-1/2 xl:ml-[0.8vw] ml-3 whitespace-nowrap bg-black text-white pointer-events-none xl:p-[0.4vw] p-1 leading-none xl:rounded-[0.3vw] rounded-sm opacity-0 group-hover:opacity-100">
                            {item.label}
                        </span>
                    </div>
                ))}

                <div className="mt-auto xl:mb-[0.6vh] mb-1 relative group">
                    <div
                        className="xl:w-[2.5vw] w-10 xl:h-[4.5vh] h-10 bg-white bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center xl:rounded-[0.3vw] rounded-md"
                        onClick={() => setShowApplications(!showApplications)}
                    >
                        <CgMenuGridO className="text-white xl:text-[1.5vw] text-2xl" />
                    </div>
                    {/* Tooltip for Grid Menu */}
                    <span className="absolute left-full top-1/2 transform -translate-y-1/2 xl:text-[0.8vw] text-xs xl:ml-[0.8vw] ml-3 whitespace-nowrap bg-black text-white pointer-events-none xl:p-[0.4vw] p-1 leading-none xl:rounded-[0.3vw] rounded-sm opacity-0 group-hover:opacity-100">
                        Show Applications
                    </span>
                </div>
            </nav>
        </React.Fragment>
    );
}
