### @mui/material

Installation command -- npm i @mui/material

### Routing

For routing, folder name are created as routes inside app folder
page.tsx is considered as main file of every folder
Folder structure-- src/app/employees/page.tsx
Route-- localhost:3000/employees

### Test Case

For unit testing of all apis in user.services.ts, jest library is used
All test cases are included in `__tests__` folder
To run tests, "npm run test" command is used which contains "jest --watchAll"
--watchAll option will watch all the files in `__tests__` folder
To make jest understand typescript --> "ts-jest" package is used --> npm install --save-dev ts-jest

### Build

"npm run build" command is used for building the application.
It includes lint inside already.
First code is linted and then compiled and then build.

### Lint

For lint of all files and code and to check of unwanted imports and never used variable/state declaration, "@next/eslint-plugin-next" is used.
Command- "npm run lint

### Fetch/ServiceClass/Regarding API

For fetching data from apis of service class in user.service.ts.
example:
const res = await UserServices.getAll();


###  local credentials

AUTH0_SECRET="abb6254d186d3828823e4fe777e1a33d52ecc6ef6bc9059836ef4c51a4b58941"
AUTH0_BASE_URL="http://localhost:3000"
AUTH0_ISSUER_BASE_URL="https://dev-ivf6ydjn5yamqequ.us.auth0.com"
AUTH0_CLIENT_ID="6EXntNoGaNMo8s1jTid3RkCWp84cRC2X"
AUTH0_CLIENT_SECRET="RSteetyqe16CslxSIhtDearNgGfJXtyZQLGxjb8kFH7UmhydYUKwpROsWvjB338Y"
NEXT_API_URL="http://localhost:8080/api"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

### important code
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Layout = ({ children }: { children: JSX.Element }) => {
return (

{children}


);
};
export default withPageAuthRequired(Layout);
