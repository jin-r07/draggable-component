import React, { useState, useRef, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { motion } from "framer-motion";
import useDoubleClick from "use-double-click";
import chromeIcon from "../../assets/icons/google-chrome.svg";
import calculatorIcon from "../../assets/icons/pcbcalculator.svg";
import fileIcon from "../../assets/icons/default-user-home.svg";
import terminalIcon from "../../assets/icons/terminal.svg";
import spotifyIcon from "../../assets/icons/spotify-client.svg";
import settingsIcon from "../../assets/icons/application-default-icon.svg";
import trashIcon from "../../assets/icons/user-trash-full.svg";
import gmailIcon from "../../assets/icons/gmail.svg";
import { useActive } from "../../utils/context";

const Icon = ({
    icon,
    label,
    isActive,
    isHovered,
    onSingleClick,
    onDoubleClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    const buttonRef = useRef(null);

    useDoubleClick({
        onSingleClick,
        onDoubleClick,
        ref: buttonRef,
        latency: 300,
    });

    return (
        <div
            ref={buttonRef}
            className={`flex flex-col items-center justify-center xl:w-[6vw] w-[5.5rem] xl:h-[10vh] h-20 bg-white bg-opacity-0 xl:rounded-[0.2vw] rounded-sm ${isHovered || isActive ? "bg-opacity-20" : "bg-opacity-0"} transition-opacity duration-100 ease-in-out`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="xl:w-[2.5vw] w-10 xl:h-[4.5vh] h-10">
                <img src={icon} alt={label} className="object-contain w-full h-full" />
            </div>
            <span className="xl:mt-[0.8vh] mt-1 xl:text-[0.7vw] text-[0.65rem] leading-none whitespace-nowrap">
                {label}
            </span>
        </div>
    );
}

export default function ShowApplications() {
    const { toggleIcon = [], toggleApplications } = useActive() || {};

    const icons = [
        { label: "Google Chrome", icon: chromeIcon, for: "google_chrome" },
        { label: "Calculator", icon: calculatorIcon, for: "calculator" },
        { label: "About Me", icon: fileIcon, for: "about_me" },
        { label: "Terminal", icon: terminalIcon, for: "terminal" },
        { label: "Spotify", icon: spotifyIcon, for: "spotify" },
        { label: "Settings", icon: settingsIcon, for: "settings" },
        { label: "Trash", icon: trashIcon, for: "trash" },
        { label: "Contact Me", icon: gmailIcon, for: "contact" },
    ];

    const [searchTerm, setSearchTerm] = useState("");

    const [activeIcon, setActiveIcon] = useState(null);

    const [hoveredIcon, setHoveredIcon] = useState(null);

    const handleSingleClick = (iconFor) => {
        setActiveIcon(iconFor);
    };

    const handleDoubleClick = (iconFor) => {
        toggleIcon(iconFor);
        setActiveIcon(iconFor);
        toggleApplications();
        setTimeout(() => {
            setActiveIcon(null);
        }, 0);
    };

    const filteredIcons = icons.filter(icon =>
        icon.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = () => {
            if (hoveredIcon === null) {
                setActiveIcon(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hoveredIcon]);

    return (
        <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 text-white flex flex-col items-center font-DMSans z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative xl:text-[0.9vw] text-xs xl:mt-[2vh] mt-3">
                <input
                    type="text"
                    placeholder="Type to Search"
                    className="sm:w-[32vw] w-full xl:h-[4vh] xl:py-[0.1vh] py-1 xl:pl-[1.7vw] pl-6 bg-white text-black xl:rounded-[0.7vw] rounded-lg cursor-text focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IoIosSearch className="absolute xl:left-[0.5vw] left-2 top-1/2 transform -translate-y-1/2 text-[#9C9C9C]" />
            </div>
            <div className="xl:mt-[5vh] mt-8 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-[5vw] sm:gap-x-[6vw] gap-x-2 xl:gap-y-[3vh] gap-y-8">
                {filteredIcons.map((item, index) => {
                    const isHovered = hoveredIcon === item.for;
                    const isActive = activeIcon === item.for;

                    return (
                        <motion.div
                            key={item.for}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Icon
                                icon={item.icon}
                                label={item.label}
                                isActive={isActive}
                                isHovered={isHovered}
                                onSingleClick={() => handleSingleClick(item.for)}
                                onDoubleClick={() => handleDoubleClick(item.for)}
                                onMouseEnter={() => setHoveredIcon(item.for)}
                                onMouseLeave={() => setHoveredIcon(null)}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
