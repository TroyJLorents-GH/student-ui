### Student Hiring System
- Live Site: https://www.troystaticsite.com
- API Base: Hosted on Azure App Service

### About Me
I'm Troy Lorents, a full-stack engineer with 7+ years of experience building applications that solve real-world problems. This project demonstrates my ability to manage a secure, scalable, and user-friendly system from front to back.

## Overview

A full-stack web application built with React.js (frontend) and connects to a secure ASP.NET Core Web API (backend). The app is hosted on Azure with automated deployment via GitHub Actions.

### `Tech Stack`

- Frontend: React.js, MUI, AG Grid, Axios
- Backend: ASP.NET Core Web API, Entity Framework, MSSQL
- Hosting: Azure Static Web Apps (frontend) + Azure App Service (backend)
- CI/CD: GitHub Actions
- Other Tools: Swagger, Power Automate, Git, Visual Studio, SQL Server 


### `Features`

- 'Student Lookup` Search by ID or name (e.g., tlorents or 123456789)
- `Class Assignment` Use cascading dropdowns to find and assign hiring classn
- `Hiring Overview` Review student details and hiring info in a clean interface
- `Position & Pay` Select position, hours, and fellowship status to auto-calculate compensation and assign correct cost center
- `Print Confirmation` Generate a printable statement upon hire
- `Bulk Upload` Upload groups of students; compensation and cost center are auto-calculated and stored for HR
- 'Master Dashboard` Secured with a master password for HR/admins to track progress and manage hires

### `Applications/Integrations` 
- `Applications` Student applications are submitted via Microsoft Forms
- Power Automate pulls data into a MSSQL database
- The frontend communicates directly with the API to fetch and update data

### `Bulk Upload`
- Can bulk upload group of students to be hired. Compensation and Cost Center Key calculated in backend and entered in to DB for HR use.

### `Dev Highlights`
- Managed secrets securely via .env and GitHub Actions Secrets (was going to use Octopus)
- Configured CORS to enable secure cross-domain API access
- Set up custom domain with HTTPS through Azure + Namecheap DNS
- Integrated CI/CD via GitHub Actions for automatic deployment on push to main

### `Live Demo`
- Frontend: www.troystaticsite.com
- Backend (Swagger UI): [Student Hiring API](https://studenthiringsystem-ccf5djgdg9dpb6ek.westus-01.azurewebsites.net/swagger/index.html)
