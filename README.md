# Recruitment task for company X

## You can find task instruction below my comment 👇

## My comment:

That was first time when I used nestjs technology. It looks like a good framework for creating backend.

### What I actually did

1. As mentioned in Task description I've started with creating backend, I've decided that for this task purposes there is no need to add an actual database. I've also added simple validation. After that I've added simple tests.
2.Later I've start working on FE part, I've mede simple UI without any fancy styling and also add tests to the functionality.
3. Later I've added docker.

### How to run the app locally (without docker)

In the project directory, you can run:

#### For ./frontend `npm run start`

#### For ./backend `npm run start:dev`

### How to run the app with docker

In the project directory, you can run:

For build image: `docker-compose build`.

For run app: `docker-compose up`.

Now, both frontend and backend services will start. You can access the frontend at http://localhost:3000 and the backend at http://localhost:4000.

To stop service: `docker-compose down`.

## Task instruction:

## Test Task for a Fullstack Developer Position

### Objective:

Create a simple "To Do List" application using the following technologies: TypeScript, React, Docker, and NestJS. The application should allow users to add, delete, and mark tasks as completed. Additionally, the application should include unit tests for key functionalities.

#### Frontend Part (React + TypeScript):

##### User Interface:

- List of tasks to be done.
- Text field for entering a new task.
- Button to add a new task.
- Next to each task, a button to delete it and a checkbox to mark it as completed.

##### Functionality:

- Add a new task to the list.
- Delete a task from the list.
- Mark a task as completed (changing the appearance of the task to be crossed out).

##### Unit Tests:

- Test adding a new task.
- Test deleting a task.
- Test marking a task as completed.

#### Backend Part (NestJS + TypeScript):

##### Endpoints:

- POST `/tasks` - add a new task.
- DELETE `/tasks/:id` - delete a task.
- PATCH `/tasks/:id` - update a task (mark as completed).

##### Data Model:

Task:

```typescript
{
  id: number,
  content: string,
  done: boolean
}
```

##### Unit Tests:

- Test the endpoint for adding a task.
- Test the endpoint for deleting a task.
- Test the endpoint for updating a task.

#### Docker:

- Create a Dockerfile for both frontend and backend.
- Use `docker-compose` to run the entire application (frontend + backend).

### Instructions:

1. Start by creating a new NestJS project for the backend and a new React project for the frontend.
2. Implement the functionalities listed above.
3. Write unit tests for key functionalities.
4. Make sure the application and tests work correctly both locally and in a Docker container.
5. Pay attention to the code quality, project structure, and error handling.

### Evaluation:

- Correct functioning of the application.
- Quality and structure of the code.
- Use of TypeScript in both parts of the application.
- Proper use of Docker and docker-compose.
- Handling of errors and server responses.
- Code coverage by unit tests and the quality of the written tests.

### Remarks:

- Focus on delivering an MVP. Advanced UI or additional functionalities are not required.
- If you don't manage to implement everything, focus on key functionalities.

**Good luck!**
