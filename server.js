// Custom server entry point for cPanel "Setup Node.js App" (Phusion Passenger).
// Passenger loads this file and the app listens on the port it provides.
// For normal hosts (Vercel, `next start`) this file is not used.
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Ready on port ${port}`);
  });
});
