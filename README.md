# 🎭 Maxfolio - The Chaotic Portfolio Generator

The internet's most chaotic portfolio generator! Create ridiculous profiles with silly job titles, random themes, and zero authentication required. It's permanent chaos, and we love it!

## 🚀 Live Demo
**Hosted on Vercel:** [Your-Vercel-Link-Here.vercel.app]

## ✨ Features

- **No Login Required** - Instant chaos creation!
- **Random Username Generator** - Get silly usernames like "cosmic-banana-47"
- **20+ Job Title Suggestions** - From "Professional Sock Matcher" to "Chief Vibe Officer"
- **Random Theme Assignment** - Each profile gets a unique color palette
- **Photo Upload** - Add your face (or any chaos) to your profile
- **Permanent Profiles** - No editing allowed! That's the fun part
- **Explore Page** - Discover random chaotic profiles from others
- **Mobile Responsive** - Create chaos on any device

## 🎨 Design Language

Maintains the beautiful **Frutiger Aero** aesthetic with a playful twist:
- Glossy UI with `.aero-card` classes
- Glassmorphism effects using `backdrop-blur`
- Vibrant color palettes (8 random themes)
- Smooth animations with Framer Motion

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Storage:** Supabase Storage (for profile photos)
- **Deployment:** [Vercel](https://vercel.com/)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/maxgarcia642/maxfolio-website.git
cd maxfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see below)

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Getting Supabase Credentials:

1. Go to [supabase.com](https://supabase.com) and create a project
2. Navigate to Settings > API
3. Copy the `Project URL` and `anon/public` key
4. Add them to your `.env.local` file

## 🗄️ Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username text UNIQUE NOT NULL,
  job_title text NOT NULL,
  bio text NOT NULL,
  skills jsonb,
  photo_url text,
  theme text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true);

-- Set up storage policy for public access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-photos');

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-photos');
```

## 📁 Project Structure

```
├── app/
│   ├── layout.js           # Root layout with metadata
│   ├── page.js             # Landing page
│   ├── create/
│   │   └── page.js         # Profile creation form
│   ├── explore/
│   │   └── page.js         # Explore random profiles
│   └── p/
│       └── [username]/
│           └── page.js     # Dynamic profile display
├── components/
│   ├── Navbar.jsx          # Main navigation
│   └── Utilities.jsx       # (Legacy - can be removed)
├── lib/
│   ├── generators.js       # Random username/theme generators
│   ├── supabase.js         # Database functions
│   └── supabaseClient.js   # Supabase client setup
└── public/
    └── assets/             # Static assets
```

## 🎲 Key Features Explained

### Random Generators (`lib/generators.js`)
- `generateUsername()` - Creates names like "cosmic-banana-47"
- `generateJobTitles()` - Returns 5 random silly job titles
- `generateTheme()` - Assigns a random color palette
- Word count validation functions

### Database Functions (`lib/supabase.js`)
- `createProfile(profileData)` - Insert new profile
- `getProfile(username)` - Fetch profile by username
- `getRandomProfiles(limit)` - Get random profiles for explore
- `uploadPhoto(file, username)` - Upload to Supabase storage
- `isUsernameAvailable(username)` - Check username availability

## 🚢 Deployment

### Deploy to Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Vercel Configuration:

The app uses Next.js default configuration. No special `vercel.json` needed.

## 🎯 Validation Rules

- **Username:** Required, URL-safe (a-z, 0-9, hyphen only)
- **Job Title:** Max 20 words
- **Bio:** Max 50 words
- **Skills:** Max 3 skills, 10 words each
- **Photo:** Max 5MB, image files only

## 🔮 Future Enhancements (Out of Scope)

- User editing (it's permanent chaos!)
- Comments/interactions
- Analytics dashboard
- Rate limiting implementation
- Admin moderation panel

## 📄 License

See LICENSE file for details.

## 🤝 Contributing

This is a personal project, but feel free to fork and create your own chaos!

## 🎭 About

Transform your boring portfolio into beautiful chaos. No authentication, no editing, just pure creative mayhem.

Built with ❤️ and chaos by [Maximiliano Garcia](https://github.com/maxgarcia642)

---

**Remember:** In Maxfolio, mistakes are permanent features! 🎨✨
