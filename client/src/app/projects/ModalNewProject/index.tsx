import { useCreateProjectMutation } from '@/state/api';
import React, { useState } from 'react'
import Modal from '@/components/Modal';

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const ModalNewProject = ({ isOpen, onClose }: Props) => {
    const [createProjects, { isLoading }] = useCreateProjectMutation();
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = async () => {
        if(!projectName || !startDate || !endDate) return;
        
        await createProjects({
            name: projectName,
            description,
            startDate,
            endDate,
        });
    };

    const isFormValid = () => {
        return projectName && description && startDate && endDate;
    }

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";


  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
        <form
            className='mt-4 space-y-6'
            onSubmit={(userInput) => {
                userInput.preventDefault();
                handleSubmit();
            }}
            >
                <input type="text"
                 className={inputStyles} 
                 placeholder="Project Name" 
                 value={projectName} 
                 onChange={(userInput) => setProjectName(userInput.target.value)}
                />
                <textarea
                 className={inputStyles} 
                 placeholder="Description" 
                 value={description} 
                 onChange={(userInput) => setDescription(userInput.target.value)}
                />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                <input type="date"
                 className={inputStyles} 
                 placeholder="Start Date" 
                 value={startDate} 
                 onChange={(userInput) => setStartDate(userInput.target.value)}
                />
                <input type="date"
                 className={inputStyles} 
                 placeholder="Due Date" 
                 value={endDate} 
                 onChange={(userInput) => setEndDate(userInput.target.value)}
                />
            </div>
            <button
                type="submit"
                className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2 ${
                    !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={!isFormValid() || isLoading}
                    >
                {isLoading ? "Creating..." : "Create Project"}
            </button>
        </form>
    </Modal>
)
}

export default ModalNewProject 