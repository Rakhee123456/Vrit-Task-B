import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Avatar } from "antd";

export default function Card({ task, index }) {
    const getBgColor = (isDragging, isBacklog) => {
        if (isDragging) return "bg-green-200";
        return isBacklog ? "bg-red-100" : "bg-gray-100";
    };

    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`p-4 rounded-lg shadow-md transition-transform transform ${
                        snapshot.isDragging ? "scale-105" : ""
                    } ${getBgColor(snapshot.isDragging, task.isBacklog)}`}
                >
                    {/* Task ID */}
                    <div className="text-sm text-gray-500 flex items-center">
                        <span>#{task.id}</span>
                    </div>
                    
                    {/* Task Title */}
                    <div className="text-center text-lg font-semibold text-gray-800 my-2">
                        {task.title}
                    </div>

                    {/* Avatar */}
                    <div className="flex justify-end mt-4">
                        <Avatar
                            onClick={() => console.log(task)}
                            src={`https://joesch.moe/api/v1/random?key=${task.id}`}
                            className="cursor-pointer"
                        />
                    </div>

                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
}
