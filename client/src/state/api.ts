import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface Project {
    id: number;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}

export enum Status {
    ToDo = "To Do",
    WorkInProgress = "Work in Progress",
    UnderReview = "Under Review",
    Completed = "Completed"
}

export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog",
}

export interface User {
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId?: string;
    teamId?: number;
}

export interface Attachment {
    id: number;
    fileUrl?: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
} 

export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    projectId?: number;
    authorUserId?: number;
    assignedUserId?: number;

    author?: UserActivation;
    assignee?: UserActivation;
    comments?: Comment[];
    attachments?: Attachment[];

}

export interface SearchResults {
    tasks?: Task[];
    projects?: Project[];
    users?: User[];
}

export interface Team {
    teamId: number;
    teamName: string;
    productOwnerUserId?: number;
    projectManagerUserId: number;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks"],
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => "projects",
            providesTags: ["Projects"],
        }),
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "projects",
                method: "POST",
                body: project,
            }),
            //to fetch updated list of projects on call
            invalidatesTags: ["Projects"],
        }),
        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `tasks?projectId=${projectId}`,
            providesTags: (result) => result ? 
            result.map(({id}) => ({ type: "Tasks" as const, id}))
            : [{ type:"Tasks" as const }],
        }),
        createTasks: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "tasks",
                method: "POST",
                body: task,
            }),
            //same as above to update list of tasks when creating a new list of tasks
            invalidatesTags: ["Tasks"],
        }),
        updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
            query: ({ taskId, status }) => ({
                //updating specific tasks
                url: `tasks/${taskId}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (result, error, { taskId }) => [
                { type: "Tasks", id: taskId },
            ]
        }),
        search: build.query<SearchResults, string>({
            query: (query) => `search?query=${query}`,
        })
    }),
})

export const { 
    useGetProjectsQuery, 
    useCreateProjectMutation, 
    useGetTasksQuery, 
    useCreateTasksMutation,
    useUpdateTaskStatusMutation,
    useSearchQuery 
} = api