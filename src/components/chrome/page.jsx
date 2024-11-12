import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useActive } from "../../utils/context";
import MinimizeIcon from "../../assets/icons/window-minimize-symbolic.svg";
import MaximizeIcon from "../../assets/icons/window-maximize-symbolic.svg";
import RestoreIcon from "../../assets/icons/window-restore-symbolic.svg";
import CloseIcon from "../../assets/icons/window-close-symbolic.svg";
import HomeIcon from "../../assets/icons/chrome_home.svg";
import RefreshIcon from "../../assets/icons/chrome_refresh.svg";
import Draggable from "react-draggable";

export default function Chrome() {
    const isClient = typeof window !== "undefined";

    const { removeIcon = [], minimizeApp = [] } = useActive() || {};

    const [searchQuery, setSearchQuery] = useState("");

    const [size, setSize] = useState(() => {
        if (isClient && localStorage.getItem("chromeSize") === "full") {
            return "full";
        }
        return window.matchMedia("(min-width: 1280px)").matches ? "small" : "half";
    });

    const [isVisible, setIsVisible] = useState(true);

    const dimensions = {
        full: { width: "100%", height: "100%" },
        half: { width: "80vw", height: "65vh" },
        small: { width: "50vw", height: "60vh" },
    };

    const position = {
        full: "top-0 left-0",
        half: "top-4 left-4",
        small: "top-[2vh] left-[1.5vw]",
    };

    useEffect(() => {
        if (isClient) {
            const savedQuery = localStorage.getItem("searchQuery");
            if (savedQuery) setSearchQuery(savedQuery);
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            if (searchQuery) {
                localStorage.setItem("searchQuery", searchQuery);
            } else {
                localStorage.removeItem("searchQuery");
            }
        }
    }, [searchQuery]);

    const handleSearch = () => {
        if (searchQuery) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
        }
    };

    const handleClose = () => {
        if (isClient) {
            localStorage.removeItem("searchQuery");
            localStorage.removeItem("chromeSize");
        }
        setTimeout(() => removeIcon("google_chrome"), 250);
        setIsVisible(false);
    };

    const handleMinimize = () => {
        minimizeApp("google_chrome");
    };

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        if (isClient) {
            if (newSize) {
                localStorage.setItem("chromeSize", newSize);
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <Draggable
                    defaultPosition={{ x: 0, y: 0 }}
                    bounds="parent"
                >
                    <motion.div
                        className={`chrome-container absolute font-DMSans ${position[size]}`}
                        initial={{ opacity: 0, width: dimensions[size].width, height: dimensions[size].height }}
                        animate={{
                            opacity: 1,
                            width: dimensions[size].width,
                            height: dimensions[size].height,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            width: dimensions[size].width,
                            height: dimensions[size].height,
                        }}
                    >
                        <div
                            className={`w-full flex items-center justify-between ${size === "full" ? "" : "rounded-t-md"} bg-[#201F1F] text-white px-2 py-1`}
                        >
                            <h1 className="flex-1 text-center text-xs">Google Chrome</h1>
                            <div className="flex items-center space-x-2">
                                <div
                                    className="icon-btn"
                                    onClick={handleMinimize}
                                >
                                    <img src={MinimizeIcon} alt="Minimize" className="icon-img" />
                                </div>

                                {size === "full" ? (
                                    <div
                                        className="icon-btn"
                                        onClick={() => handleSizeChange("small")}
                                    >
                                        <img src={RestoreIcon} alt="Restore" className="icon-img" />
                                    </div>
                                ) : (
                                    <div
                                        className="icon-btn"
                                        onClick={() => handleSizeChange("full")}
                                    >
                                        <img src={MaximizeIcon} alt="Maximize" className="icon-img" />
                                    </div>
                                )}

                                <div
                                    className="icon-btn"
                                    onClick={handleClose}
                                >
                                    <img src={CloseIcon} alt="Close" className="icon-img" />
                                </div>
                            </div>
                        </div>

                        <div className="chrome-body w-full h-full bg-[#333333] flex flex-col">
                            <div className="flex items-center px-2 py-1 bg-[#111111] text-[#ACB0B4]">
                                <div className="icon-btn" onClick={handleSearch}>
                                    <img src={RefreshIcon} alt="Refresh" className="icon-img" />
                                </div>
                                <div className="icon-btn" onClick={handleSearch}>
                                    <img src={HomeIcon} alt="Home" className="icon-img" />
                                </div>
                                <div className="url-bar w-full">
                                    <p className="url-text">https://www.google.com</p>
                                </div>
                            </div>

                            <div className="p-4 bg-white w-full h-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                    placeholder="Search Google or type a URL"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="search-btn mt-2"
                                >
                                    <FaSearch /> Search
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </Draggable>
            )}
        </AnimatePresence>
    );
}
