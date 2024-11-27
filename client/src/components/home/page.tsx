"use client";

import { useAppSelector } from '@/app/redux';
import { Priority, Project, Task, useGetProjectsQuery, useGetTasksQuery,} from '@/state/api';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';
import Header from '../Header';


const taskColumns: GridColDef[] = [
    {field: "title", headerName: "Title", width: 200},
    {field: "status", headerName: "Status", width: 150},
    {field: "priority", headerName: "Priority", width: 150},
    {field: "dueDate", headerName: "Due Date", width: 150},
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
    const { 
        data: tasks, 
        isLoading: tasksLoading, 
        isError: tasksError } = useGetTasksQuery({ projectId: parseInt("1")})
   
    const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery();

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    
    if (tasksLoading || isProjectsLoading) return <div>Loading...</div>
    if (tasksError || !tasks || !projects) return <div>Error fetching data</div>

    const priorityCount = tasks.reduce(
        (acc: Record<string, number>, task: Task) => {
            const {priority} = task;
            acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
            return acc;
        },
        {},
    );

    const taskDistribution  = Object.keys(priorityCount).map((key) => ({
        name: key,
        count: priorityCount[key],
    }));

    const statusCount = projects.reduce(
        (acc: Record<string, number>, project: Project) => {
            const status = project.endDate ? "completed" : "active";
            acc[status] = (acc[status] || 0 ) + 1; 
            return acc;
        },
        {},
    );

    const projectStatus = Object.keys(statusCount).map((key) => ({
        name: key,
        count: statusCount[key],
    }));

    
    const chartColors = isDarkMode ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
    } : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82CA9D",
        text: "#000000"

    }

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
        <Header name="Project Management Dashboard" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div>
    </div>
  );
};

export default HomePage;