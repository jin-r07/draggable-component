import React from "react";
import { FaWifi } from "react-icons/fa";
import { PiBatteryHighFill } from "react-icons/pi";
import { IoMdArrowDropright, IoMdSettings } from "react-icons/io";
import { IoHeadset, IoLockClosedSharp } from "react-icons/io5";
import { MdBrightnessMedium } from "react-icons/md";
import { FaBluetoothB } from "react-icons/fa6";
import { GrPowerShutdown } from "react-icons/gr";

export default function ControlCenter() {
    return (
        <div className="w-full h-fit text-white xl:py-[1vh] py-2 font-DMSans">
            {/* Volume and Brightness Options */}
            <div className="xl:text-[1.1vw] text-sm">
                <div className="flex items-center xl:px-[1.5vw] px-4 xl:py-[0.3vh] py-1 bg-[#3D3B3A] bg-opacity-0 hover:bg-opacity-100">
                    <IoHeadset />
                    <input type="range" min="0" max="100" defaultValue="70" className="w-full xl:h-[0.3vh] h-[2px] xl:ml-[0.8vw] ml-4 bg-[#545352] appearance-none outline-none xl:rounded-[0.2vw] rounded-md slider" />
                </div>
                <div className="flex items-center xl:px-[1.5vw] px-4 xl:py-[0.3vh] py-1 bg-[#3D3B3A] bg-opacity-0 hover:bg-opacity-100">
                    <MdBrightnessMedium />
                    <input type="range" min="0" max="100" defaultValue="50" className="w-full xl:h-[0.3vh] h-[2px] xl:ml-[0.8vw] ml-4 bg-[#545352] appearance-none outline-none xl:rounded-[0.2vw] rounded-md slider" />
                </div>
            </div>
            <hr className="xl:border-t-[0.13vw] border-t-[1px] border-[#141414] xl:my-[1vh] my-2 xl:mx-[3.5vw] mx-12" />

            {/* Wi-Fi, Bluetooth, and Battery Options */}
            <div>
                <div className="flex items-center xl:px-[1.5vw] px-4 xl:py-[0.3vh] py-1 bg-[#3D3B3A] bg-opacity-0 hover:bg-opacity-100">
                    <FaWifi className="xl:text-[1.1vw] text-sm" />
                    <div className="w-full flex items-center justify-between xl:text-[0.75vw] text-xs xl:ml-[0.9vw] ml-4">
                        <p className="text-[#787C86] leading-none">Hello World!</p>
                        <IoMdArrowDropright />
                    </div>
                </div>
                <div className="flex items-center xl:px-[1.5vw] px-4 xl:py-[0.3vh] py-1 bg-[#3D3B3A] bg-opacity-0 hover:bg-opacity-100">
                    <FaBluetoothB className="xl:text-[1.1vw] text-sm" />
                    <div className="w-full flex items-center justify-between xl:text-[0.75vw] text-xs xl:ml-[0.9vw] ml-4">
                        <p className="text-[#787C86] leading-none">Off</p>
                        <IoMdArrowDropright />
                    </div>
                </div>
                <div className="flex items-center xl:px-[1.5vw] px-4 xl:py-[0.3vh] py-1 bg-[#3D3B3A] bg-opacity-0 hover:bg-opacity-100">
                    <PiBatteryHighFill className="xl:text-[1.1vw] text-sm" />
                    <div className="w-full flex items-center justify-between xl:text-[0.75vw] text-xs xl:ml-[0.9vw] ml-4">
                        <p className="text-[#787C86] leading-none">4:45 Remaining (80%)</p>
                        <IoMdArrowDropright />
                    </div>
                </div>
            </div>
            <hr className="xl:border-t-[0.13vw] border-t-[1px] border-[#141414] xl:my-[1vh] my-2 xl:mx-[3.5vw] mx-12" />

            {/* Settings, Lock, and Power Off / Log Out Options */}
            <div>
                <div className="flex items-center xl:px-[1.5vw] px-4 xl:py-[0.3vh] py-1 bg-[#3D3B3A] bg-opacity-0 hover:bg-opacity-100">
                    <IoMdSettings className="xl:text-[1.1vw] text-sm" />
                    <div className="w-full flex items-center justify-between xl:text-[0.75vw] text-xs xl:ml-[0.9vw] ml-4">
                        <p className="leading-none">Settings</p>
                    </div>
                </div>
                <div className="flex items-center xl:px-[1.5vw] px-4 xl:py-[0.3vh] py-1 bg-[#3D3B3A] bg-opacity-0 hover:bg-opacity-100">
                    <IoLockClosedSharp className="xl:text-[1.1vw] text-sm" />
                    <div className="w-full flex items-center justify-between xl:text-[0.75vw] text-xs xl:ml-[0.9vw] ml-4">
                        <p className="leading-none">Lock</p>
                    </div>
                </div>
                <div className="flex items-center xl:px-[1.5vw] px-4 xl:py-[0.3vh] py-1 bg-[#3D3B3A] bg-opacity-0 hover:bg-opacity-100">
                    <GrPowerShutdown className="xl:text-[1.1vw] text-sm" />
                    <div className="w-full flex items-center justify-between xl:text-[0.75vw] text-xs xl:ml-[0.9vw] ml-4">
                        <p className="leading-none">Power Off / Log Out</p>
                        <IoMdArrowDropright />
                    </div>
                </div>
            </div>
        </div>
    );
}
