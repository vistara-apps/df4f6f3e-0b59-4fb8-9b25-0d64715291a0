# Project Palooza

A Base Mini App for connecting gay men through collaborative project matching, inspired by Tinder's swipe interface.

## 🚀 Features

- **Project Matching**: Swipe through projects to find collaboration opportunities
- **Profile Creation**: Create detailed profiles with skills, interests, and bio
- **Real-time Chat**: Communicate with matched collaborators
- **Farcaster Integration**: Seamless authentication via Farcaster
- **Base Mini App**: Native Frame experience within Farcaster

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Blockchain**: Base, Farcaster
- **Authentication**: Farcaster Frames
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- Supabase account
- Neynar API key (for Farcaster verification)
- Vercel account (for deployment)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd project-palooza
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Neynar API Key (for Farcaster verification)
NEYNAR_API_KEY=your_neynar_api_key_here

# OnchainKit API Key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here

# Base URL for the app
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the database schema in your Supabase SQL editor:

```sql
-- Copy the contents of database/schema.sql and run it
```

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

### 5. Deployment

Deploy to Vercel:

```bash
npm run build
# Deploy via Vercel CLI or connect your GitHub repo
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth`
Authenticate a user via Farcaster Frame message.

**Request Body:**
```json
{
  "untrustedData": {
    "fid": "123",
    "messageHash": "...",
    "network": 1,
    "timestamp": 1234567890
  },
  "trustedData": {
    "messageBytes": "..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "userId": "uuid",
    "username": "john_doe",
    "farcasterId": "123"
  }
}
```

### Profile Endpoints

#### GET `/api/profile?farcasterId=123`
Get user profile information.

#### POST `/api/profile`
Update user profile via Frame input.

### Projects Endpoints

#### GET `/api/projects`
Get paginated list of projects.

**Query Parameters:**
- `limit` (optional): Number of projects to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)
- `creatorId` (optional): Filter by creator ID

#### POST `/api/projects`
Create a new project via Frame input.

**Frame Input Format:** `Project Name,Description,Skills,Outcomes,Category`

### Swipe Endpoints

#### POST `/api/swipe`
Record a swipe action.

**Request Body:** Frame message with button index (1=left/pass, 2=right/like)

### Matches Endpoints

#### GET `/api/matches?farcasterId=123`
Get user's matches.

### Frame Endpoints

#### GET `/api/frame`
Main Frame endpoint - returns initial Frame configuration.

#### POST `/api/frame`
Handle Frame interactions and return updated Frame state.

#### GET `/api/frame/image/*`
Dynamic image generation for Frame previews.

## 🏗️ Architecture

### Database Schema

- **users**: User profiles with Farcaster integration
- **projects**: Project listings with skills and requirements
- **swipes**: User swipe actions on projects
- **matches**: Successful matches between users
- **chat_messages**: Real-time chat messages

### Frame Flow

1. **Initial Frame**: Welcome screen with navigation options
2. **Discover**: Project swiping interface
3. **Profile**: User profile management
4. **Matches**: View matched collaborators
5. **Chat**: Real-time messaging

## 🔧 Development Guidelines

### Code Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── frame/             # Frame-specific pages
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── services/         # Database service layers
│   └── types.ts          # TypeScript definitions
├── database/             # Database schemas
└── public/               # Static assets
```

### Component Guidelines

- Use TypeScript for all components
- Implement proper error boundaries
- Add loading states for async operations
- Follow Tailwind CSS design system
- Ensure mobile-first responsive design

### API Guidelines

- Use proper HTTP status codes
- Implement comprehensive error handling
- Validate input data
- Add rate limiting for production
- Document all endpoints

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database schema applied
- [ ] Farcaster Frame metadata updated
- [ ] SSL certificate configured
- [ ] Domain configured
- [ ] Monitoring and logging set up
- [ ] Error tracking configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

