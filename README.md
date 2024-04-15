# Smart Home Portal

## The portal is live at https://smart-home-portal-srk.web.app

Create a `.env` file with the firebase configs, you can ask me for them 😉

## Project Structure

## `src/`

The source directory contains all the development files.

### `assets/`
This folder has static assets. Usually i put icons, fonts, images here

### `components/`
Contains reusable UI components. Components in this directory are generic and designed to be used in multiple places across the application, such as buttons, tables, or form elements like specific input fileds with custom styling.

### `models/`
Includes class definitions for the main entities or objects used throughout the application (e.g., `User.js` for user data structure). If i do the project with typescript, i specifiy the types here as well

### `pages/`
Holds components representing entire pages within the application.

### `providers/`
This directory contains context providers for React's Context API. It includes the `FirebaseContext` for providing Firebase operations throughout the app and can be extended with other contexts like auth or theme providers.

### `services/`
Contains services or utilities for external interactions, such as API calls. The Firebase service, for example, abstracts Firebase operations (e.g., fetching or updating data) away from the UI logic.

## `index.js`
The entry point for the React application. It wraps the `App` component with the `AppProvider` component from the `providers/` directory to ensure that context providers are available throughout the application.

## `App.js`
Defines the main application component and includes routing logic. It uses `BrowserRouter` from React Router to define routes corresponding to different pages within the application.

## Routing and Page Structure

The application's routing is managed in `App.js`, utilizing React Router for navigation between different pages. Each route is associated with a component from the `pages/` directory, defining the layout and content for that route's page.

## Context and State Management

Global state management is facilitated through context providers located in the `providers/` directory. For example, the `FirebaseContext` allows Firebase services to be accessed by any component within the application without prop drilling or direct imports, promoting cleaner and more maintainable code.

## Styling

Styling is done using a combination of boostrap and raw css. I am using the `.module.css` approach for clean code an ease of maintainance

## Things to notice

* conditional rendering
* animations using key frame
* state management
* context api
* routing
* modal alert
* from the home page you can fill a multi-step form to create user, home, room and object (for now only single items)
* each of the item in top navigation bar allows you to see the actual data from firestore database for users, homes, rooms and object
* every item can be deleted individually showing granular functions, on requirement all items can be deleted together
* correctly referenced links between user and home, home and room, room and object can be seen in the tables.

## Class Diagram
![Class Diagram](/src/assets/class_diagrams/img.png "Class Diagram")

