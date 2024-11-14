import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface Project {
    id: number;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}

export interface Task {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points: number;
    projectId: number;
    authorUser: number;
    assignUserId: number;
}


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes: [],
    endpoints: (build) => ({
        
    }),
})

export const {} = api