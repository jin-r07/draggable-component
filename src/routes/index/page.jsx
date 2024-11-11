import React, { useState, useRef, useEffect } from "react";
import useDoubleClick from "use-double-click";
import LeftNavbar from "../../components/leftNavbar/page";
import TopNavbar from "../../components/topNavbar/page";
import chromeIcon from "../../assets/icons/google-chrome.svg";
import fileIcon from "../../assets/icons/default-user-home.svg";
import trashIcon from "../../assets/icons/user-trash-full.svg";
import gmailIcon from "../../assets/icons/gmail.svg";
import { useActive } from "../../utils/context";
import ShowApplications from "../../components/showApplications/page";
import Chrome from "../../components/chrome/page";

export default function Index() {
    const { active = [], toggleIcon, showApplications } = useActive() || {};

    const [hoveredIcon, setHoveredIcon] = useState(null);

    const [activeIcon, setActiveIcon] = useState(null);

    const buttonRefs = useRef([]);

    const icons = [
        { label: "Google Chrome", icon: chromeIcon, for: "google_chrome" },
        { label: "About Me", icon: fileIcon, for: "about_me" },
        { label: "Trash", icon: trashIcon, for: "trash" },
        { label: "Contact Me", icon: gmailIcon, for: "contact" },
    ];

    const handleSingleClick = (iconFor) => {
        // Set active icon for single-click effect, ensuring only one icon is active at a time
        setActiveIcon(iconFor);
    };

    const handleDoubleClick = (iconFor) => {
        // Trigger toggle action on double-click
        toggleIcon(iconFor);

        // Apply the double-click effect, ensuring only one icon shows bg-opacity-20 at a time
        setActiveIcon(iconFor);

        // Clear the double-clicked effect after 1 second
        setTimeout(() => {
            setActiveIcon(null); // Clear active icon after double-click effect duration
        }, 1000); // 1 second delay for double-click effect
    };

    // Function to handle clicks outside the icon divs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRefs.current.every(ref => ref && !ref.contains(event.target))) {
                setActiveIcon(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className="grid xl:grid-cols-[3vw_auto] grid-cols-[3rem_auto] xl:grid-rows-[3vh_1fr] grid-rows-[1.25rem_1fr] w-full h-screen overflow-hidden font-DMSans">
            <TopNavbar className="col-span-2" />
            <LeftNavbar className="row-span-2" />

            {/* Main Content Area with Icons Positioned at Top-Right in a Single Column */}
            <div className="col-start-2 row-start-2 relative">
                <div className="absolute xl:top-[1vh] top-2 xl:right-[0.5vw] right-2 flex flex-col items-center">
                    {icons.map((item, index) => {
                        const buttonRef = useRef(null);
                        buttonRefs.current[index] = buttonRef.current;

                        useDoubleClick({
                            onSingleClick: () => handleSingleClick(item.for),
                            onDoubleClick: () => handleDoubleClick(item.for),
                            ref: buttonRef,
                            latency: 300,
                        });

                        // Determine background opacity based on hover or active state
                        const isHovered = hoveredIcon === item.for;

                        const isActive = activeIcon === item.for;

                        return (
                            <div
                                key={index}
                                ref={buttonRef}
                                data-icon={item.for}
                                className={`flex flex-col items-center justify-center xl:w-[6vw] w-[5.5rem] xl:h-[10vh] h-20 xl:mb-[0.4vh] mb-1 bg-white bg-opacity-0 xl:rounded-[0.2vw] rounded-sm transition-opacity duration-100 ease-in-out 
                                    ${isHovered || isActive ? "bg-opacity-20" : "bg-opacity-0"}`}
                                onMouseEnter={() => setHoveredIcon(item.for)}
                                onMouseLeave={() => setHoveredIcon(null)}>
                                <div className="relative xl:w-[2.5vw] w-10 xl:h-[4.5vh] h-10">
                                    <img
                                        src={item.icon}
                                        alt={item.label}
                                        className="object-contain"
                                    />
                                </div>
                                {/* Label Below Icon */}
                                <span className="xl:mt-[0.8vh] mt-1 xl:text-[0.7vw] text-[0.65rem] text-white leading-none">
                                    {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
                {showApplications && <ShowApplications />}
                {active.google_chrome?.active && active.google_chrome.visible && <Chrome />}
            </div>
        </section>
    );
}
