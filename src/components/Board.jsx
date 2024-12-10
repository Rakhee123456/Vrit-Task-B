import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function Board() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((json) => {
                setCompleted(json.filter((task) => task.completed));
                setIncomplete(json.filter((task) => !task.completed));
            });
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [
            ...incomplete,
            ...completed,
            ...inReview,
            ...backlog,
        ]);

        setNewState(destination.droppableId, task);
    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(removeItemById(taskId, incomplete));
                break;
            case "2":
                setCompleted(removeItemById(taskId, completed));
                break;
            case "3":
                setInReview(removeItemById(taskId, inReview));
                break;
            case "4":
                setBacklog(removeItemById(taskId, backlog));
                break;
        }
    }

    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1": // TO DO
                updatedTask = { ...task, completed: false };
                setIncomplete([updatedTask, ...incomplete]);
                break;
            case "2": // DONE
                updatedTask = { ...task, completed: true };
                setCompleted([updatedTask, ...completed]);
                break;
            case "3": // IN REVIEW
                updatedTask = { ...task, completed: false };
                setInReview([updatedTask, ...inReview]);
                break;
            case "4": // BACKLOG
                updatedTask = { ...task, completed: false };
                setBacklog([updatedTask, ...backlog]);
                break;
        }
    }

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    const handleAddTask = (columnId) => {
        if (!newTask.trim()) return;

        const newTaskObj = {
            id: Date.now(), // Use a timestamp as a unique ID
            title: newTask,
            completed: columnId === "2", // Mark as completed if added to the "DONE" column
        };

        switch (columnId) {
            case "1":
                setIncomplete([newTaskObj, ...incomplete]);
                break;
            case "2":
                setCompleted([newTaskObj, ...completed]);
                break;
            case "3":
                setInReview([newTaskObj, ...inReview]);
                break;
            case "4":
                setBacklog([newTaskObj, ...backlog]);
                break;
        }

        setNewTask(""); // Clear the input field
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 className="text-2xl font-bold text-center text-gray-800 my-4">
                PROGRESS BOARD
            </h2>
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-center mb-2">
                    Add a New Task
                </h3>
                <div className="flex justify-center items-center gap-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
                        placeholder="Enter task title..."
                    />
                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2"
                        onChange={(e) => handleAddTask(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select Column
                        </option>
                        <option value="1">TO DO</option>
                        <option value="2">DONE</option>
                        <option value="3">IN REVIEW</option>
                        <option value="4">BACKLOG</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center gap-6 mx-auto w-full max-w-6xl overflow-x-auto">
                <Column title={"TO DO"} tasks={incomplete} id={"1"} />
                <Column title={"DONE"} tasks={completed} id={"2"} />
                <Column title={"IN REVIEW"} tasks={inReview} id={"3"} />
                <Column title={"BACKLOG"} tasks={backlog} id={"4"} />
            </div>


        </DragDropContext>
    );
}
