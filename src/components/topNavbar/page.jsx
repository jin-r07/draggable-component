import React, { useEffect, useRef, useState } from "react";
import { getFormattedCurrentTime } from "../../utils/timeUtil";
import { FaWifi } from "react-icons/fa";
import { TbVolume } from "react-icons/tb";
import { PiBatteryHighFill } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import CustomCalendar from "../calendar/page";
import ControlCenter from "../controlCenter/page";

export default function TopNavbar({ className }) {
    const [currentTime, setCurrentTime] = useState(getFormattedCurrentTime());

    const [selectedSection, setSelectedSection] = useState(null);

    const [underlineStyle, setUnderlineStyle] = useState({});

    const nameRef = useRef(null);

    const timeRef = useRef(null);

    const iconsRef = useRef(null);

    const dropdownRef = useRef(null);

    const dropdownRef2 = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedCurrentTime());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const updateUnderlinePosition = (section) => {
        const ref = section === "name" ? nameRef : section === "time" ? timeRef : iconsRef;
        if (ref.current) {
            const { offsetLeft, offsetWidth } = ref.current;
            setUnderlineStyle({
                left: offsetLeft,
                width: offsetWidth,
                opacity: 1,
            });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (selectedSection) {
                updateUnderlinePosition(selectedSection);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [selectedSection]);

    const handleSectionClick = (section) => {
        if (selectedSection === section) {
            setSelectedSection(null);
            setUnderlineStyle({ opacity: 0 });
        } else {
            setSelectedSection(section);
            updateUnderlinePosition(section);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is inside the dropdown menus
            if (
                (dropdownRef.current && dropdownRef.current.contains(event.target)) ||
                (dropdownRef2.current && dropdownRef2.current.contains(event.target)) ||
                (timeRef.current && timeRef.current.contains(event.target)) ||
                (iconsRef.current && iconsRef.current.contains(event.target))
            ) {
                // Click is inside the dropdowns or time/icons section; do nothing
                return;
            }

            // Check if the click is outside of the name reference
            if (nameRef.current && !nameRef.current.contains(event.target)) {
                setSelectedSection(null);
                setUnderlineStyle({ opacity: 0 });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full xl:h-[3vh] h-5 ${className} bg-black xl:px-[1vw] px-2 font-DMSans z-40`}>
            <div className="relative w-full h-full flex items-center justify-between text-white xl:text-[0.8vw] text-xs">
                <p ref={nameRef} onClick={() => handleSectionClick("name")} >&gt;_&nbsp;&nbsp;John</p>
                <p ref={timeRef} onClick={() => handleSectionClick("time")}>{currentTime}</p>
                <div ref={iconsRef} onClick={() => handleSectionClick("icons")} className="flex items-center xl:gap-x-[0.4vw] gap-x-1">
                    <FaWifi />
                    <TbVolume />
                    <PiBatteryHighFill />
                    <IoMdArrowDropdown />
                </div>
                {/* Underline */}
                <span className="absolute bottom-0 xl:h-[0.1vw] h-[1.5px] bg-red-500" style={{ ...underlineStyle, position: 'absolute', opacity: underlineStyle.opacity }} />
            </div>

            {/* Dropdown Menu with Framer Motion */}
            <AnimatePresence>
                {selectedSection === "icons" && (
                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.3 }}
                        className="absolute xl:top-[4vh] top-6 xl:right-[0.8vw] right-2 xl:w-[15vw] w-56 h-auto bg-[#272727] xl:rounded-[0.3vw] rounded-md xl:pt-0 pt-0.5 pointer-events-auto border-[1px] border-[#212121]"
                    >
                        {/* Triangle */}
                        <div className="absolute xl:top-[-1vh] -top-1 right-[1vw] transform -translate-x-1/2 w-0 h-0 xl:border-l-[0.5vw] border-l-[6px] border-l-transparent xl:border-r-[0.5vw] border-r-[6px] border-r-transparent xl:border-b-[0.5vw] border-b-[6px] border-b-[#292929]" />
                        <ControlCenter />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Calendar with Framer Motion */}
            <AnimatePresence>
                {selectedSection === "time" && (
                    <motion.div
                        ref={dropdownRef2}
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.3 }}
                        className="absolute xl:top-[4vh] top-6 inset-0 flex justify-center pointer-events-auto"
                    >
                        <div>
                            {/* Triangle */}
                            <div className="absolute xl:top-[-1vh] -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 xl:border-l-[0.5vw] border-l-[6px] border-l-transparent xl:border-r-[0.5vw] border-r-[6px] border-r-transparent xl:border-b-[0.5vw] border-b-[6px] border-b-[#292929]" />
                            <div className="flex lg:flex-row flex-col w-full h-fit bg-[#272727] xl:p-[0.8vw] p-2 xl:rounded-[0.3vw] rounded-md">
                                <div className="flex flex-col">
                                    <div className="lg:w-[30vw] w-full h-full flex items-center justify-center">
                                        <div className="flex lg:flex-col items-center">
                                            <IoMdNotificationsOutline className="text-[#929191] lg:text-[3vw] text-2xl" />
                                            <p className="text-white lg:text-[0.9vw] text-sm lg:mt-[1.5vh] leading-none xl:pl-0 pl-2">No Notifications</p>
                                        </div>
                                    </div>
                                </div>
                                <CustomCalendar />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
}
