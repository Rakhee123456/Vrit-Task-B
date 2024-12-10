import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import "./scroll.css";

export default function Column({ title, tasks, id }) {
    return (
        <div
            className="column  bg-gray-100 shadow-lg rounded-lg w-[400px] h-[900px] overflow-y-auto border border-gray-300"
        >
            <h3
                className="text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-center sticky top-0 z-10 rounded-t-lg"
            >
                {title}
            </h3>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-4 space-y-4 ${
                            snapshot.isDraggingOver
                                ? "bg-blue-100 transition-colors"
                                : "bg-gray-100"
                        }`}
                    >
                        {tasks.map((task, index) => (
                            <Card key={index} index={index} task={task} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
