# Auth0 Next.js Frontend

This is the frontend part of the Auth0 authentication project, built with Next.js and TypeScript.

## Features

- 🔐 Auth0 authentication integration
- 🛡️ Protected routes and pages
- 🎯 JWT token management
- 📱 Responsive design with Tailwind CSS
- 🔗 API integration with Spring Boot backend
- 👤 User profile management

## Prerequisites

- Node.js 18+ and npm
- Auth0 account (free tier available)
- Running Spring Boot backend (optional for full functionality)

## Auth0 Setup

1. **Create Auth0 Account**

   - Go to [Auth0](https://auth0.com) and sign up for a free account

2. **Create Auth0 Application**

   - In Auth0 Dashboard, go to Applications > Create Application
   - Choose "Single Page Web Applications"
   - Select "React" as the technology
   - Note down the `Domain` and `Client ID`

3. **Configure Auth0 Application**

   - In the application settings:
     - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
     - **Allowed Logout URLs**: `http://localhost:3000`
     - **Allowed Web Origins**: `http://localhost:3000`

4. **Create Auth0 API**
   - Go to APIs > Create API
   - Give it a name (e.g., "Spring Boot API")
   - Set the Identifier (e.g., `https://your-api.example.com`)
   - Choose RS256 as the signing algorithm
   - Note down the `Audience` (API Identifier)

## Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   - Copy `.env.local` file and update with your Auth0 credentials:

   ```bash
   # Auth0 Configuration
   AUTH0_SECRET='your-32-character-random-string'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='https://your-auth0-domain.auth0.com'
   AUTH0_CLIENT_ID='your-client-id'
   AUTH0_CLIENT_SECRET='your-client-secret'
   AUTH0_AUDIENCE='your-api-audience'

   # Public environment variables
   NEXT_PUBLIC_AUTH0_AUDIENCE='your-api-audience'
   ```

3. **Generate Auth0 Secret**

   ```bash
   # On Windows (PowerShell)
   -join ((1..32) | ForEach {[char][int]((97..122) + (48..57) | Get-Random)})

   # On macOS/Linux
   openssl rand -hex 32
   ```

## Development

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Open the application**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...auth0]/     # Auth0 API routes
│   ├── protected/               # Protected page example
│   ├── layout.tsx              # Root layout with UserProvider
│   └── page.tsx                # Home page
├── components/
│   ├── LoginButton.tsx         # Login/Logout button
│   ├── Profile.tsx             # User profile display
│   └── ProtectedApiTest.tsx    # API testing component
└── ...
```

## Usage

### Authentication Flow

1. **Login**: Click "Login" button to redirect to Auth0
2. **Authentication**: Complete Auth0 login process
3. **Callback**: Return to application with JWT token
4. **Protected Access**: Access protected routes and API calls

### Testing API Integration

1. Ensure your Spring Boot backend is running on `http://localhost:8080`
2. Navigate to the protected dashboard
3. Use the "API Testing" section to:
   - Test authenticated API calls (with token)
   - Test unauthenticated calls (should fail)

### Components Usage

- **LoginButton**: Displays login/logout based on authentication state
- **Profile**: Shows user information and raw user object
- **ProtectedApiTest**: Tests API calls with and without authentication

## Security Features

- ✅ JWT token automatic handling
- ✅ Secure token storage
- ✅ Protected route authentication
- ✅ API request authentication headers
- ✅ Automatic token refresh
- ✅ Secure logout process

## API Integration

The frontend integrates with a Spring Boot backend for:

- Protected endpoint testing (`/api/protected`)
- JWT token validation
- Demonstration of authentication flow

Backend URL is configurable in the `ProtectedApiTest` component.

## Troubleshooting

### Common Issues

1. **Module not found errors**: Run `npm install` to ensure all dependencies are installed
2. **Auth0 errors**: Check environment variables match your Auth0 configuration
3. **API calls failing**: Ensure backend is running and CORS is configured
4. **Token issues**: Check Auth0 API audience configuration

### Environment Variables

Make sure all required environment variables are set in `.env.local`:

- `AUTH0_SECRET`: Random 32-character string
- `AUTH0_BASE_URL`: Your app URL (http://localhost:3000 for development)
- `AUTH0_ISSUER_BASE_URL`: Your Auth0 domain
- `AUTH0_CLIENT_ID`: Auth0 application client ID
- `AUTH0_CLIENT_SECRET`: Auth0 application client secret
- `AUTH0_AUDIENCE`: Auth0 API identifier
- `NEXT_PUBLIC_AUTH0_AUDIENCE`: Same as AUTH0_AUDIENCE (for client-side access)

## Learn More

- [Auth0 Next.js Quickstart](https://auth0.com/docs/quickstart/spa/nextjs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Auth0 Documentation](https://auth0.com/docs)

## License

This project is for educational purposes as part of the Emerging Trends course.
