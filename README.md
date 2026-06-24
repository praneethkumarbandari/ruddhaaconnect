# RuddhaConnect Frontend

Complete frontend for RuddhaConnect ERP system with 29 screens.

## Setup

### Development
```bash
npm install
npm run dev
```

Open http://localhost:5173

### Production (Netlify)
```bash
# Push to GitHub
git push origin main

# Netlify auto-deploys on push
# Or manually: netlify deploy --prod
```

## Files

- `*.html` - 29 HTML screens
- `api-config.js` - API endpoints configuration
- `netlify.toml` - Netlify deployment config
- `package.json` - npm scripts

## API Integration

Update your HTML forms to call backend APIs:

```javascript
// Example: GST calculation
const result = await apiCall(API.GST.CALCULATE, {
  method: 'POST',
  body: JSON.stringify({
    amount: 1000,
    gstRate: 18
  })
});

console.log(result);
```

## Environment

Frontend calls backend at:
- Local: http://localhost:3001
- Production: https://your-backend.netlify.app

