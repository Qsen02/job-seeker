# API References
This is the list of routes, authentication and enviroments of the server.
## Routes
### Users
- (GET) /users/me - Get current user
- (POST) /users/register - Register user
- (POST) /users/login - Login to user account
- (GET) /users/logout - Logout from user account
- (GET) /users/:userId - Get user by id
- (PUT) /users/edit/:userId - Update user by id (Users)
- (PUT) /users/change-password/:userId - Change user password (Users)
### Companies
- (GET) /companies/ - Get all companies
- (GET) /companies/:companyId - Get company by id
- (GET) /companies//for-owner/:ownerId - Get all companies created by owner (Admin)
- (POST) /companies/ - Create new company (Admin)
- (DELETE) /companies/:companyId - Delete company (Admin)
- (PUT) /companies/:companyId - Update company (Admin)
### Jobs
- (GET) /jobs/:jobId - Get job by id
- (GET) /jobs/paginate/:page?filter={filter}&value={value} - Paginate jobs by page and filter (filter is optional)
- (GET) /jobs/for-company/:companyId - Get all jobs for company
- (GET) /jobs/for-user/:userId - Get all jobs for user
- (POST) /jobs/in-company/:companyId - Create and add new job to company (Admin)
- (DELETE) /jobs/:jobId/in-company/:companyId - Delete job and remove this job from company (Admin)
- (PUT) /jobs/:jobId - Update job (Admin)
### Candidatures
- (GET) /candidatures/in-job/:jobId - Get all candidatures for job (Users)
- (GET) /candidatures/for-user/:userId - Get all candidatures for user (Users)
- (GET) /candidatures/:candidatureId - Get candidature by id (Users)
- (POST) /candidatures/in-job/:jobId - Create new candidature and add it to job (Users)
- (DELETE) /candidatures/:candidatureId/in-job/:jobId - Delete candidature and remove it from job (Users)
- (PUT) /candidatures/:candidatureId - Update candidature (Users)
- (PUT) /candidatures/change-status/:candidatureId - Change candidature status (Admin)
## Authentication
- Json web token
- Cookies
## Guards
- User guard
- Admin guard
## Environments
PORT = 3000
COOKIE_SECRET = Secrect for cookies
TOKEN_SECRET = Secret for json web token
CLOUDINARY_CLOUD_NAME = Cloudinary storage name
CLOUDINARY_API_KEY = Api key for Cloudinary
CLOUDINARY_API_SECRET = Api secret for Cloudinary