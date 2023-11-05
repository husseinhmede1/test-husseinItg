## Running the Project Locally
- npm install
- npm start

###### Changes Made for Test
######
This project utilizes a responsive React.js along with CSS and Redux Toolkit for efficient data management
and redux-persist to persisting Redux.
It employs hooks for state management and Redux for user authentication. 
######

The structure is as follows:

######
- SignIn Component (Login Page):
######
Responsible for handling form submission, sending user credentials for authentication.
Upon successful authentication, it logs in the user, extracts a token, and redirects to "/institutionPage".
In case of an error, it displays an alert.
Utilizes a loader component for feedback during loading.
If the user is already logged in, they are redirected to the institution page.

######
- InstitutionPage Component (Institution Page):
######
Defines a function, handleLogout, to manage user logout by dispatching a logout action and redirecting to the login page.
Contains components for various functionalities:
LoaderComponent: Displays loading indicators.
Logout button.
Search bar (SearchComponent) for filtering institutions.
Grid (GridComponent) for displaying institution data.
Component (SaveComponent) for editing and saving institution information.

######
- SearchComponent Component:
######
Utilizes the useEffect hook to fetch a list of active institutions on component mount.
Upon a successful response, it updates the list of institutions.
Filters the list based on the provided search term.
Renders a container with a heading "Institutions" and an input field for searching.

######
- GridComponent Component:
######
Imports file-saver for file downloads and a custom SliderComponent.
Uses the useEffect hook to fetch institution data based on the search term.
Implements debouncing for enhanced performance.
Provides functions for sorting data, paginating results, printing the table, handling clicks on institutions, changing status, and deleting institutions.
Renders a container with a heading "Institutions List", a print button, and a slider component for selecting options.
Displays a table with pagination controls, sortable columns, and options for deleting or changing the status of institutions.

######
- SaveComponent Component:
######
Upon submission, makes a POST request to the API "v1/config/institutions"
with the institution data and appropriate headers, 
including an authorization token.
