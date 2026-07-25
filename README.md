![Hackatime](https://hackatime.hackclub.com/api/v1/badge/U096RMRG03G/Sankarshan-T/study-stack)
![Hackatime](https://hackatime.hackclub.com/api/v1/badge/U096RMRG03G/Sankarshan-T/studystack)

# [Study Stack](https://study-stack-tracker.vercel.app)
An awesome tool to assign tasks and track students' progress. Assign tasks to students and give them deadlines to finish them!

## Tech stack
- Next js (Main language)
- React (Famework)
- Typescript
- Tailwind Css (Styling)
- Clerk (Third party application for auth)
- Neon (database)

## Features:
- Create classrooms
- Add students ans teachers
- Create assignments
- Track students progress
- Students can mark ans assignment as completed

## Local setup:
1. Clone this repository
``` git clone https://github.com/Sankarshan-T/study-stack```

2.  Install all dependencies using npm
```npm install```

3. Create file .env with all keys needed from clerk for authentication and neon for the database
``` NEXT_PUBLIC_CLERK_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=

    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=....
    CLERK_SECRET_KEY=....

    #Database
    DATABASE_URL=postgresql://...