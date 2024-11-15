import React, { useState } from "react";
import Draggable from "react-draggable";

export default function Index() {
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

    const handleDrag = (e, { x, y }) => {
        setDragPosition({ x, y });
    };

    return (
        <section className="w-full h-screen">
            <Draggable
                position={dragPosition}
                onDrag={handleDrag}
                bounds="parent"
            >
                <div className="w-fit h-fit border-[1px] border-gray-400">
                    <h1 className="bg-gray-200 text-center">Drag Me</h1>
                    <p className="p-4">You must left mouse press me to drag me.</p>
                </div>
            </Draggable>
        </section>
    );
}
