# Getting Started with Create React App

# Task Management App

## View

- The screen is divided into three columns, each representing a unique state: **Todo**, **In Progress**, and **Done**.
- **Add Button**: Allows users to create new tasks.
- **Delete Button**: Enables deletion of multiple selected tasks.
- **Language Switcher**: Allows users to toggle between Arabic and English for the entire app.

## Board

- Users can drag tasks between columns: from **Todo** to **In Progress**, and from **In Progress** to **Done**, and vice versa.
- Action buttons (e.g., **Checkbox**, **Edit**, and **Remove**) are only visible in the **Todo** column.
- Each task contains:
  - **Name** (required)
  - **Description** (optional)
  - **Priority** (LOW, MEDIUM, HIGH), which is reflected on the task card through icon.
- Data is fetched from **local storage** and persists through user interactions, such as dragging, creating, editing, and deleting tasks.
- Each column shows the number of tasks it contains.
- When multiple tasks are selected, a global **Delete** button is displayed, showing the number of selected items.
- When selecting a task (or tasks), the individual task action buttons (e.g., **Edit**, **Delete**) and the **Create Button** are hidden until the user takes action or resets the selection.
- The screen is **responsive**, adjusting to various screen sizes (Desktop, Tablet, and Mobile).

## Create Task

- A **Create Task** dialog opens, allowing users to enter task details:
  - **Name**: Required (min: 3 characters, max: 18 characters).
  - **Description**: Optional (max: 32 characters).
  - **Priority**: Required (LOW, MEDIUM, HIGH).
- Users can navigate between dialog fields using the keyboard (press **Enter** to submit, **Esc** to close).
- The dialog includes **error validation** to prevent task creation until all fields are filled correctly.
- The dialog is fully **translated**, including text and direction.
- Upon clicking **Create**, the dialog closes, and feedback is shown based on the result.
- The main board updates immediately to reflect the newly created task.
- Data is saved in **local storage** and persists after page refreshes.

## Update Task

- The **Update Task** dialog opens with pre-filled data from the selected task.
- The **Update** button is disabled until changes are made to the default data.
- The same validation rules from the **Create** dialog apply to updates.
- After clicking **Update**, the dialog closes, and feedback is shown based on the result.
- The main board updates immediately to reflect the changes.
- Data is saved in **local storage** and persists after page refreshes.

## Delete Task

### Single Task Delete

- A confirmation dialog opens when the user clicks **Delete**.
- The dialog is fully **translated**, including text and direction.
- After confirming deletion, the dialog closes, and feedback is shown based on the result.
- The main board updates immediately to reflect the task removal.
- Data is saved in **local storage** and persists after page refreshes.

### Multiple Task Delete

- Users can select multiple tasks, and the **Delete** button is enabled.
- A confirmation dialog opens, showing the number of selected tasks.
- After confirming deletion, the dialog closes, and feedback is shown based on the result.
- The main board updates immediately to reflect the removal of selected tasks.
- Data is saved in **local storage** and persists after page refreshes.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
