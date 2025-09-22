# Project Palooza - Deployment Guide

This guide covers the complete deployment process for Project Palooza, including database setup, environment configuration, and production deployment.

## Prerequisites

- Vercel account
- Supabase account
- Neynar API key
- Domain name (optional)

## 1. Database Setup

### Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Choose your organization and project name
3. Select a database password (save this securely)
4. Choose your region (preferably close to your users)

### Configure Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `database/schema.sql`
3. Run the SQL script to create all tables and policies

### Get Supabase Credentials

1. Go to Settings → API in your Supabase dashboard
2. Copy the following values:
   - Project URL
   - Project API Key (anon/public)

## 2. Environment Configuration

### Create Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Neynar API Key (for Farcaster verification)
NEYNAR_API_KEY=your-neynar-api-key-here

# OnchainKit API Key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-onchainkit-api-key-here

# Base URL for the app (update after deployment)
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### Neynar API Setup

1. Go to [Neynar](https://neynar.com) and sign up for an account
2. Create a new API key for Farcaster verification
3. Add the API key to your environment variables

## 3. Vercel Deployment

### Connect Repository

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (leave default)

### Environment Variables

In your Vercel project settings, add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEYNAR_API_KEY=your-neynar-api-key-here
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-onchainkit-api-key-here
NEXT_PUBLIC_BASE_URL=https://your-deployment-url.vercel.app
```

### Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be available at `https://your-project-name.vercel.app`

## 4. Domain Configuration (Optional)

### Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Update your `NEXT_PUBLIC_BASE_URL` environment variable

### SSL Certificate

Vercel automatically provides SSL certificates for all deployments. No additional configuration needed.

## 5. Farcaster Frame Configuration

### Update Frame Metadata

In your deployed app, ensure the Frame metadata is correctly configured:

```typescript
// In your Frame API routes
const frameMetadata = {
  'fc:frame': 'vNext',
  'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame/image/welcome`,
  'fc:frame:button:1': 'Discover Projects',
  'fc:frame:button:2': 'Create Profile',
  'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
};
```

### Test Frame

1. Deploy a test Frame to Farcaster
2. Use the Frame validator to ensure proper functionality
3. Test all interaction flows

## 6. Database Security

### Row Level Security (RLS)

The database schema includes RLS policies. Ensure they are properly configured:

- Users can only view/modify their own data
- Projects are publicly readable
- Matches are only visible to matched users
- Swipes are private to the swiper

### API Key Security

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Monitor API usage for suspicious activity

## 7. Monitoring and Analytics

### Error Tracking

Set up error tracking (recommended: Sentry):

```bash
npm install @sentry/nextjs
```

### Analytics

Add analytics tracking (recommended: Vercel Analytics):

```bash
npm install @vercel/analytics
```

### Database Monitoring

Monitor your Supabase database:
- Set up alerts for unusual query patterns
- Monitor database size and performance
- Set up backups and point-in-time recovery

## 8. Performance Optimization

### Build Optimization

1. Enable Vercel Analytics for performance monitoring
2. Optimize images and assets
3. Implement proper caching strategies
4. Use Next.js Image component for images

### Database Optimization

1. Add appropriate indexes
2. Monitor query performance
3. Implement connection pooling
4. Set up database replicas for read-heavy operations

## 9. Backup and Recovery

### Database Backups

Supabase automatically creates backups, but you should:

1. Set up additional backup schedules
2. Test backup restoration procedures
3. Store backups in multiple locations

### Code Repository

1. Use GitHub for version control
2. Implement proper branching strategy
3. Use pull requests for all changes
4. Tag releases for easy rollback

## 10. Post-Deployment Checklist

- [ ] Environment variables configured correctly
- [ ] Database schema applied and tested
- [ ] SSL certificate active
- [ ] Domain DNS configured (if using custom domain)
- [ ] Frame metadata working correctly
- [ ] Authentication flow tested
- [ ] Swipe and matching functionality verified
- [ ] Chat system operational
- [ ] Error handling working
- [ ] Performance monitoring active
- [ ] Backup procedures tested

## Troubleshooting

### Common Issues

1. **Frame not loading**: Check Frame metadata and API endpoints
2. **Authentication failing**: Verify Neynar API key and Frame message validation
3. **Database connection issues**: Check Supabase credentials and network connectivity
4. **Build failures**: Check environment variables and dependency versions

### Logs and Debugging

1. Check Vercel deployment logs
2. Monitor Supabase database logs
3. Use browser developer tools for client-side debugging
4. Check Frame validator for Frame-specific issues

## Support

For deployment issues, check:
1. Vercel documentation
2. Supabase documentation
3. Farcaster Frame documentation
4. Project GitHub issues

## Security Considerations

- Regularly update dependencies
- Monitor for security vulnerabilities
- Implement rate limiting
- Use HTTPS everywhere
- Validate all user inputs
- Implement proper CORS policies

