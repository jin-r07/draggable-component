import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useActive } from "../../utils/context";
import MinimizeIcon from "../../assets/icons/window-minimize-symbolic.svg";
import MaximizeIcon from "../../assets/icons/window-maximize-symbolic.svg";
import RestoreIcon from "../../assets/icons/window-restore-symbolic.svg";
import CloseIcon from "../../assets/icons/window-close-symbolic.svg";

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

    const [hasSizeChanged, setHasSizeChanged] = useState(false);

    const [isVisible, setIsVisible] = useState(true);

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
        newSize = newSize === "small" && !window.matchMedia("(min-width: 1280px)").matches ? "half" : newSize;
        prevSizeRef.current = { size, dimensions: dimensions[size], position: position[size] };
        setSize(newSize);
        if (isClient) {
            if (newSize) {
                localStorage.setItem("chromeSize", newSize);
            }
        }
        setHasSizeChanged(true);
    };

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

    // Track previous size and position dimensions
    const prevSizeRef = useRef({
        size,
        dimensions: dimensions[size],
        position: position[size],
    });

    useEffect(() => {
        const handleResize = () => {
            // Prevent changing the size if it is already "full"
            if (size === "full") return;

            const isWideScreen = window.matchMedia("(min-width: 1280px)").matches;
            setSize(isWideScreen ? "small" : "half");
            setHasSizeChanged(true);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [size]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`absolute font-DMSans ${position[size]}`}
                    initial={{
                        opacity: 0,
                        width: dimensions[size].width,
                        height: dimensions[size].height,
                    }}
                    animate={{
                        opacity: 1,
                        width: hasSizeChanged ? dimensions[size].width : prevSizeRef.current.dimensions.width,
                        height: hasSizeChanged ? dimensions[size].height : prevSizeRef.current.dimensions.height,
                        x: hasSizeChanged ? 0 : prevSizeRef.current.position.split(" ")[0],
                        y: hasSizeChanged ? 0 : prevSizeRef.current.position.split(" ")[1],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.25,
                        width: { duration: hasSizeChanged ? 0.25 : 0 },
                        height: { duration: hasSizeChanged ? 0.25 : 0 },
                    }}
                    style={{
                        width: hasSizeChanged ? dimensions[size].width : prevSizeRef.current.dimensions.width,
                        height: hasSizeChanged ? dimensions[size].height : prevSizeRef.current.dimensions.height,
                    }}
                >
                    <div className={`w-full xl:h-[3.5vh] h-fit flex items-center justify-between ${size === "full" ? "" : "xl:rounded-[0.5vw] rounded-md"} bg-[#201F1F] text-white xl:px-[0.2vw] px-1 xl:py-[0.6vw] py-1`}>
                        <h1 className="flex-1 text-center xl:text-[0.8vw] text-xs">Google Chrome</h1>
                        <div className="flex items-center justify-center xl:space-x-[0.3vw] space-x-1">
                            <div className="flex items-center justify-center">
                                <div className="relative xl:w-[1.2vw] w-4 xl:h-[2.4vh] h-4 hover:bg-gray-700 rounded-full flex items-center justify-center" onClick={handleMinimize}>
                                    <img
                                        src={MinimizeIcon}
                                        alt="Minimize"
                                        className="object-contain absolute transform -translate-y-[15%] w-full h-full"
                                    />
                                </div>
                            </div>

                            {size === "full" ? (
                                <div className="flex items-center justify-center">
                                    <div className="relative xl:w-[1.2vw] w-4 xl:h-[2.4vh] h-4 hover:bg-gray-700 rounded-full flex items-center justify-center" onClick={() => handleSizeChange("small")}>
                                        <img
                                            src={RestoreIcon}
                                            alt="Minimize"
                                            className="object-contain absolute w-full h-full"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <div className="relative xl:w-[1.2vw] w-4 xl:h-[2.4vh] h-4 hover:bg-gray-700 rounded-full flex items-center justify-center" onClick={() => handleSizeChange("full")}>
                                        <img
                                            src={MaximizeIcon}
                                            alt="Minimize"
                                            className="object-contain absolute w-full h-full"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-center">
                                <div className="relative xl:w-[1.2vw] w-4 xl:h-[2.4vh] h-4 hover:bg-red-600 rounded-full flex items-center justify-center" onClick={handleClose}>
                                    <img
                                        src={CloseIcon}
                                        alt="Minimize"
                                        className="object-contain absolute w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white w-full h-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none cursor-text"
                            placeholder="Search Google or type a URL"
                        />
                        <button onClick={handleSearch} className="mt-2 bg-blue-500 text-white p-2 rounded">
                            <FaSearch /> Search
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence >
    );
}
