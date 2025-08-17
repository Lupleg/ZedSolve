# ZedSolve - Academic Document Sharing Platform

A StudoCu-inspired platform where students can upload, share, and discover academic materials including assignments, exams, notes, and study resources from universities worldwide.

## Features

### 🎓 For Students
- **Browse & Download**: Access thousands of documents from universities globally
- **Upload & Share**: Share your assignments, notes, and study materials
- **Community Interaction**: Comment, like, and rate documents
- **University Profiles**: Browse content by specific universities and courses
- **Search & Filter**: Find exactly what you need with advanced filtering

### 📚 Document Types Supported
- Assignments & Homework
- Exams & Quizzes  
- Lecture Notes
- Lab Reports
- Research Papers
- Presentations
- Thesis Documents

### 🔐 User Features
- **Guest Access**: Browse and view documents without signing up
- **Member Benefits**: Upload, comment, like, and bookmark content
- **University Verification**: Verified profiles for authentic academic content
- **Points System**: Earn points for contributing valuable content

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Convex (Database & Real-time)
- **Authentication**: Clerk
- **File Storage**: UploadThing
- **UI Components**: Radix UI + shadcn/ui

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Convex account
- Clerk account  
- UploadThing account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zedsolve.git
   cd zedsolve
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Convex
   CONVEX_DEPLOYMENT=your-convex-deployment
   NEXT_PUBLIC_CONVEX_URL=https://your-convex-url
   
   # Clerk Authentication  
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   
   # UploadThing
   UPLOADTHING_SECRET=sk_live_...
   UPLOADTHING_APP_ID=your-app-id
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── documents/         # Document browsing & detail pages
│   ├── universities/      # University pages  
│   ├── upload/           # Document upload page
│   └── page.tsx          # Homepage
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   └── header.tsx       # Main navigation
├── convex/              # Backend functions & schema
│   ├── schema.ts        # Database schema
│   ├── documents.ts     # Document-related functions
│   ├── users.ts         # User management
│   └── comments.ts      # Comments & interactions
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions
```

## Key Features Implementation

### 🔍 Document Discovery
- Advanced search with filters by type, university, subject
- Featured documents and trending content
- University-specific document collections

### 📤 Document Upload
- Drag & drop file upload with UploadThing
- Rich metadata for better discoverability  
- Document preview and validation
- Privacy controls and permissions

### 👥 Community Features  
- Commenting system with threading
- Like/dislike voting on documents and comments
- User profiles with contribution history
- Follow system for content creators

### 🏛️ University Integration
- University verification system
- Course and department organization
- Academic year and semester tracking
- Professor and grade information

## Database Schema

The app uses Convex with the following main collections:

- **users**: Student profiles and authentication
- **universities**: Academic institutions
- **courses**: University courses and programs  
- **documents**: Uploaded academic materials
- **comments**: Community discussions
- **interactions**: Likes, bookmarks, and views
- **categories & tags**: Content organization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
   ```bash
   vercel
   ```

2. **Set up environment variables in Vercel dashboard**

3. **Deploy Convex functions**
   ```bash
   npx convex deploy
   ```

### Docker

```bash
docker build -t zedsolve .
docker run -p 3000:3000 zedsolve
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@zedsolve.com
- 💬 Discord: [Join our community](https://discord.gg/zedsolve)
- 📖 Documentation: [docs.zedsolve.com](https://docs.zedsolve.com)

## Acknowledgments

- Inspired by StudoCu's academic sharing model
- Built with modern web technologies for optimal performance
- Designed for the global student community

---

**Happy studying! 🎓📚**
