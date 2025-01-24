# Project Management Solution Template
This application provides a simple, and performant interface for an organization to implement agile methodology across teams in an organization.


## How It's Made:

**Tech used:** Next.js, TypeScript,  React.js, Redux, TailwindCSS, Node.js, Express, Prisma, PostreSQL.

Through the use of the vast React component packages available such as lucide-react I created a simple, yet intuitive UI. There's a dynamic display of task and project tables being read from the database along with assignee and assigner data. Integrates gantt charts for illustrated timelines and drag and drop grids to move tasks along a priority designation(Urgent -> High -> Medium -> Low -> Backlog -> Completed).
A search functionality that pattern matches users and task ids from tasks table to display cards. 


## Optimizations:

After running into off by 1 errors within my tables after migrations, this led to me defaulting to using raw SQL queries to accurately represent how the data displays within the tables. If I were to make this application from the ground up once again, I'd probably reach for Go or Rust which are more performant, statically type(more enforced than in TypeScript), and better support for concurrency on the backend. 

## Lessons Learned:

This was a crash course in the, power that's offered by Next.js from bundling, file routing, local development server, as well as the robust support for Typescript. Also as stated in the section above, this was also a clear example of the power of raw SQL queries and knowing how to use them.
