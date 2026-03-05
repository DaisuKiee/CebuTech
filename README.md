# CebuTech - Batch 2023-2027 Showcase

A modern, responsive website showcasing the journey of BSIT students from Cebu.

## Tech Stack

- **Frontend**: React 18
- **Backend**: Express.js
- **Styling**: Custom CSS with modern design
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Development Mode

Run the React development server with hot reload:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Production Mode

1. Build the React app:
```bash
npm run build
```

2. Start the Express server:
```bash
npm run server
```

The server will run at [http://localhost:5000](http://localhost:5000)

### Quick Production Build & Run

```bash
npm run dev
```

This will build the React app and start the Express server in one command.

## Project Structure

```
cebutech/
├── public/              # Static files
│   └── index.html      # Base HTML template
├── src/
│   ├── components/     # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Programs.jsx
│   │   ├── Projects.jsx
│   │   ├── BatchInfo.jsx
│   │   ├── About.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── styles/
│   │   └── cebutech.css
│   ├── App.js
│   └── index.js
├── server.js           # Express server
└── package.json
```

## Features

- Modern, aesthetic dark theme design
- Smooth animations and transitions
- Responsive layout for all devices
- Fast loading with optimized assets
- SEO-friendly structure
- Express backend ready for API integration

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm run server` - Start Express server
- `npm run dev` - Build and run production server
- `npm test` - Run tests

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
NODE_ENV=production
```

## Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder and `server.js` to your hosting platform

3. Set environment variables on your hosting platform

4. Start the server:
   ```bash
   node server.js
   ```

## License

© 2026 CebuTech. All rights reserved.
