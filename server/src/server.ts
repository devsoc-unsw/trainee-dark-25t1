// Server imports
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorHandler from 'middleware-http-errors';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Helper functions
import { deleteToken, generateToken } from './helper/tokenHelper';

// Route imports
import { authRegister } from './auth/register';
import { authLogin } from './auth/login';
import { authLogout } from './auth/logout';


// Database client
const prisma = new PrismaClient();

// Set up web app using JSON
const app = express();
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));

const httpServer = new Server(app);

// Use middleware that allows for access from other domains
app.use(cors({
  origin: ["http://localhost:3001"],
  credentials: true
}));


const PORT: number = parseInt(process.env.PORT || '3000');
const isProduction: boolean = process.env.NODE_ENV === "production";


///////////////////////// ROUTES /////////////////////////


// HEALTH CHECK ROUTE
app.get('/', async (req: Request, res: Response) => {
  console.log("Health check")
  res.status(200).json({
    message: "Server is up!"
  });
});


// AUTH ROUTES

// Register a new user
app.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, username, profilePic } = req.body;
    const user = await authRegister(name, email, password, username, profilePic || process.env.PROFILE_PIC_BASE64 as string);

    // Assign cookies
    res.cookie('accessToken', user.accessToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 1800000 });
    res.cookie('refreshToken', user.refreshToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 7776000000 });

    res.header('Access-Control-Allow-Credentials', 'true');

    res.status(200).json({ userId: user.userId, name: user.name, email: user.email, profilePic: user.profilePic });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Login a user
app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authLogin(email, password);

    // Assign cookies
    res.cookie('accessToken', user.accessToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 1800000 });
    res.cookie('refreshToken', user.refreshToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 7776000000 });

    res.header('Access-Control-Allow-Credentials', 'true');

    res.status(200).json({ userId: user.userId, name: user.name, email: user.email, profilePic: user.profilePic });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Logout a user
app.post('/auth/logout', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const refreshToken = req.cookies.refreshToken;
    await authLogout(refreshToken);

    // Assign cookies
    res.clearCookie('accessToken', { domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost" });
    res.clearCookie('refreshToken', { domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost" });

    res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});


///////////////////////// SERVER /////////////////////////


// Logging errors
app.use(morgan('dev'));

app.use(errorHandler());

// Start server
const server = httpServer.listen(PORT, () => {
  console.log(`⚡️ Server listening on port ${PORT}`);
});

// For coverage, handle Ctrl+C
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server.'));
});

/* ------------------- HELPER FUNCTIONS ------------------- */
async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) { res.status(401).json({ error: "No token provided." }); return; }

  try {
    const atDecoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET as string) as JwtPayload;

    if (atDecoded && atDecoded.userId) {
      const user = await prisma.user.findUnique({ where: { id: atDecoded.userId } });

      if (!user) { res.status(403).json({ error: "User not found." }); return; }

      if (user && user.remainingLoginAttempts <= 0) { res.status(403).json({ error: "User is blocked." }); return; }

      res.locals.userId = atDecoded.userId;
      return next();
    } else {
      // Access token not valid
      res.status(403).json({ error: "Invalid access token." });
      return;
    }
  } catch (err) {
    // If access token is expired or invalid, attempt to use refresh token
    if (!refreshToken) { res.status(401).json({ error: "No refresh token provided." }); return; }

    try {
      const rtDecoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET as string) as JwtPayload;

      if (rtDecoded && rtDecoded.userId) {
        // Generate new token pair
        const newTokens = await generateToken(rtDecoded.userId);

        // Delete the previous refresh token as they are single use only
        await deleteToken(refreshToken);

        // Set new cookies
        res.cookie('accessToken', newTokens.accessToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 1800000 });
        res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 7776000000 });

        res.locals.userId = rtDecoded.userId;
        return next();
      }
    } catch (refreshErr) {
      // Refresh token is invalid or expired
      res.status(403).json({ error: "Invalid refresh token. Please log in again." });
      return;
    }

    // For any other errors
    res.status(500).json({ error: "An unexpected error occurred when authenticating token." });
    return;
  }
}