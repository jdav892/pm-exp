import { Status, Priority, useCreateTasksMutation } from '@/state/api';
import React, { useState } from 'react'
import Modal from '@/components/Modal';
import { formatISO } from "date-fns"

type Props = {
    isOpen: boolean;
    onClose: () => void;
    id: string | null;
}

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
    const [createTask, {isLoading}] = useCreateTasksMutation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Status>(Status.ToDo);
    const [priority, setPriority] = useState<Priority>(Priority.Backlog);
    const [tags, setTags] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [authorUserId, setAuthorUserId] = useState("");
    const [assignedUserId, setAssignedUserId] = useState("");
    const [projectId, setProjectId] = useState("");

    const handleSubmit = async () => {
        if(!title || !authorUserId || !(id !== null || projectId)) return;
        
        const formattedStartDate = formatISO(new Date(startDate), { representation: "complete"})
        const formattedDueDate = formatISO(new Date(dueDate), { representation: "complete"})


        await createTask({
            title,
            description,
            status,
            priority,
            tags,
            startDate: formattedStartDate,
            dueDate: formattedDueDate,
            authorUserId: parseInt(authorUserId),
            assignedUserId: parseInt(assignedUserId),
            projectId: id !== null ? Number(id) : Number(projectId),
        });
    };

    const isFormValid = () => {
        return title && authorUserId && !(id !== null || projectId);
    }

    const selectStyles = 
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

    const inputStyles = 
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";


  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
        <form
            className='mt-4 space-y-6'
            onSubmit={(x) => {
                x.preventDefault();
                handleSubmit();
            }}
            >
                <input type="text"
                 className={inputStyles} 
                 placeholder="Title" 
                 value={title} 
                 onChange={(x) => setTitle(x.target.value)}
                />
                <textarea
                 className={inputStyles} 
                 placeholder="Description" 
                 value={description} 
                 onChange={(x) => setDescription(x.target.value)}
                />
                                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                    <select
                            className={selectStyles}
                            value={status}
                            onChange={(x) => 
                                setStatus(Status[x.target.value as keyof typeof Status])}
                        >
                            <option value="">Select Status</option>
                            <option value={Status.ToDo}>To Do</option>
                            <option value={Status.WorkInProgress}>Work In Progress</option>
                            <option value={Status.UnderReview}>Under Review</option>
                            <option value={Status.Completed}>Completed</option>
                    </select>
                    <select
                            className={selectStyles}
                            value={priority}
                            onChange={(x) => 
                                setPriority(Priority[x.target.value as keyof typeof Priority])}
                        >
                            <option value="">Select Status</option>
                            <option value={Priority.Urgent}>Urgent</option>
                            <option value={Priority.High}>High</option>
                            <option value={Priority.Medium}>Medium</option>
                            <option value={Priority.Low}>Low</option>
                            <option value={Priority.Backlog}>Backlog</option>
                    </select>
                </div>
                <input type="text"
                 className={inputStyles} 
                 placeholder="Tags(comma separated)" 
                 value={tags} 
                 onChange={(x) => setTags(x.target.value)}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <input type="date"
                 className={inputStyles} 
                 placeholder="Start Date" 
                 value={startDate} 
                 onChange={(x) => setStartDate(x.target.value)}
                />
                <input type="date"
                 className={inputStyles} 
                 placeholder="Due Date" 
                 value={dueDate} 
                 onChange={(x) => setDueDate(x.target.value)}
                />
            </div>
            <input type="text"
                 className={inputStyles} 
                 placeholder="Author User ID" 
                 value={authorUserId} 
                 onChange={(x) => setAuthorUserId(x.target.value)}
                />
                 <input type="text"
                 className={inputStyles} 
                 placeholder="Assigned User Id" 
                 value={assignedUserId} 
                onChange={(x) => setAssignedUserId(x.target.value)}
                />
                {id === null && (
                  <input type="text"
                 className={inputStyles} 
                 placeholder="ProjectId" 
                 value={projectId} 
                onChange={(x) => setProjectId(x.target.value)}
                />  
                )}
            <button
                type="submit"
                className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${
                    !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={!isFormValid() || isLoading}
                    >
                {isLoading ? "Creating..." : "Create Task"}
            </button>
        </form>
    </Modal>
)
}

export default ModalNewTask 