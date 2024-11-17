"use client";

import React, {useState} from 'react'
import ProjectHeader from '@/app/projects/ProjectHeader'

type Props = {
    params: { id: string };
};

const Project = ({ params }: Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    console.log("Rendering project with ID:", id);
  return (
    <div>
        {/*MODAL NEW TASK*/}
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Project;