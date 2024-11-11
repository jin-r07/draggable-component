import React, { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function CustomCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getStartDay = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const changeMonth = (offset) => {
        setCurrentDate((prevDate) => {
            const newMonth = prevDate.getMonth() + offset;
            return new Date(prevDate.getFullYear(), newMonth, 1);
        });
    };

    const renderCalendar = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const daysInMonth = getDaysInMonth(month, year);
        const startDay = getStartDay(month, year);
        const days = [];

        // Empty slots for days before the start of the month
        for (let i = 0; i < startDay; i++) {
            days.push(<div className="day empty" key={`empty-${i}`} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            days.push(
                <div
                    className={`day flex items-center justify-center xl:px-0 px-0.5 xl:py-[0.8vh] py-1 rounded-full ${isToday ? 'bg-red-500 text-white' : 'hover:bg-red-500 hover:text-white'}`}
                    key={day}
                >
                    {day}
                </div>
            );
        }
        return days;
    };

    const formatDay = (day) => {
        return day < 10 ? `0${day}` : `${day}`;
    };

    // Get the current day name and formatted date with leading zero for single-digit days
    const currentDayName = today.toLocaleString("default", { weekday: "long" });

    const formattedDate = `${today.toLocaleString("default", { month: "long" })} ${formatDay(today.getDate())} ${today.getFullYear()}`;

    return (
        <div className="xl:w-[17vw] w-full h-fit text-white xl:rounded-[0.3vw] rounded-md xl:text-[0.8vw] text-xs leading-none lg:border-l-[0.15vw] border-[#2F2F2F] lg:px-[1vw] font-DMSans">
            <div className="xl:py-[2vh] py-3 xl:ml-[0.5vw] ml-2">
                <p className="xl:mb-[0.2vh] mb-0.5">{currentDayName}</p>
                <p className="xl:text-[1vw] text-sm leading-none">{formattedDate}</p>
            </div>
            <div className="bg-[#2F2F2F]">
                <header className="flex flex-col items-center xl:p-[0.5vw] p-2">
                    <div className="flex justify-between items-center w-full">
                        <button onClick={() => changeMonth(-1)} className="bg-[#272727] bg-opacity-0 hover:bg-opacity-100 xl:rounded-[0.2vw] rounded-sm xl:p-[0.15vw] p-0.5 cursor-default">
                            <RiArrowLeftSLine />
                        </button>
                        <h2>
                            {currentDate.toLocaleString("default", { month: "long" })}
                        </h2>
                        <button onClick={() => changeMonth(1)} className="bg-[#272727] bg-opacity-0 hover:bg-opacity-100 xl:rounded-[0.2vw] rounded-sm xl:p-[0.15vw] p-0.5 cursor-default">
                            <RiArrowRightSLine />
                        </button>
                    </div>
                </header>
                <div className="grid grid-cols-7 xl:gap-[0.5vw] gap-2 xl:p-[0.5vw] p-2">
                    {/* Days of the Week Initials */}
                    {daysOfWeek.map((day, index) => (
                        <p key={index} className="flex justify-center items-center xl:text-[0.7vw] text-xs leading-none">
                            {day}
                        </p>
                    ))}
                    {renderCalendar()}
                </div>
            </div>
            <div className="w-full h-fit bg-[#2F2F2F] xl:my-[2vh] mt-3 xl:py-[0.4vw] py-2 xl:px-[0.5vw] px-2">
                <p className="xl:mb-[0.2vh] mb-0.5 text-[#929191]">Today</p>
                <p>No Events</p>
            </div>
        </div>
    );
}
