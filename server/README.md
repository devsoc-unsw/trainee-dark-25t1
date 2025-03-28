# GitTogether Backend

## 1. Project Set Up

If you are interested to know how I set up the project, feel free to read through this section. Otherwise, you can skip this section :)

### 1.1 Background
This directory is called `server`, which is the convention for monorepositories. Monorepositories are when both the frontend and backend code are stored in the same repository (hence, mono). The backend directory is usually called the `server`, and the frontend directory is usually called the `client`.

### 1.2 NPM
First, run the command `npm init -y` which basically sets up a simple `package.json` file to manage our `npm i`'s. Once I have the `package.json` file, I usually have "default" scripts that I always use in my projects:
```json
  "scripts": {
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "npx prisma migrate deploy && node dist/server.js",
    "dev": "nodemon src/server.ts"
  },
```

What this means is basically commands to run our npm with, e.g. `npm run build` will allow `tsc` to run which is compiling our TypeScript code (tsc is TypeScript Compiler). Note that you do not have to run this every time, as we will be using `nodemon`, which can be done by running `npm run dev`. 

### 1.3 Express.js

Now that we have NPM set up, we can install Express by running the command `npm i express dotenv` which will enable us to run a simple Express server. Note that `dotenv` is used to read environment variables from a `.env` file (haha get it? dotenv?). Anyway, now we will be able to start our Express server but where is the fun in using plain boring JavaScript. Let's use TypeScript (because we're cool) !!

### 1.4 TypeScript

Now that we have Express set up, we can install TypeScript by running the command `npm i -D typescript @types/express @types/node`. This will save these packages as devDependencies. Then, we need to set up our `tsconfig.json` which is essentially a config file for TypeScript and it has a lot of options and it offers the flexibility to modify compiler settings. Initialise the file by running `npx tsc --init`. I also usually have a template for my file, which you can check out at the repo's `tsconfig.json`. Note that you are not expected to understand all of the options.

### 1.5 .gitignore

We do not want to commit important files (or unimportant ones) into the repository as it is a huge security risk (or it just clutters the repo with annoying files such as `.DS_STORE`) so this file tells **git** which files should be "hidden" (i.e. will not be added/pushed to the repository). I also have a template that I usually use so feel free to check out `.gitignore`.

### 1.6 Prisma

Not every project will require you to use Prisma for the database, but this project does use Prisma so I will set it up too. Simply run `npx prisma init` and it will generate a `prisma` directory which will be very important in the future. However, this directory basically stores your schema as well as any migrations that is applied.

### 1.7 Express Server

Now that we have everything downloaded/set up, we can start writing code (exciting !!) in `src/server.ts` which will be where all routes live in. This is the template that I use:

```ts
// Server imports
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorHandler from 'middleware-http-errors';
import cors from 'cors';
import 'dotenv/config';
import { Server } from 'http';

// Helper functions here if needed

// Route imports here


// Set up web app using JSON
const app = express();
app.use(express.json());
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
app.get('/', (req: Request, res: Response) => {
  console.log("Health check")
  return res.status(200).json({
    message: "Server is up!"
  });
});


// OTHER ROUTES HERE


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
```

This basically sets up the Express server and now if we run `npm run dev` it should start the Express server on `http://localhost:3000` and if we go to `http://localhost:3000/` we should see `{"message":"Server is up!"}`. And with that, we are done with the initial set up of the backend.

## 2. First Steps

Firstly, `git clone` the entire repository, not just this directory (I don't think its possible to clone just this directory anyway). Once you have done that, just follow these commands:

```sh
git clone git@github..... # your preferred way of cloning

cd server
npm i # this installs the packages defined in package.json
```

Initial installation is complete. Now, create a `.env` file in the `server` directory and paste the following content:
```sh
# For development, this should be "production" in deployment
NODE_ENV="development"
PORT=3000

# Other environment variables will not be written in this README as it is a huge security risk. I will let you know what other environment variables to add.
```

Next, we should initialise the database by running `npx prisma generate`.

Now, we can run the server by using
```sh
npm run dev # starts the Express server
```

That is all for setting up!

## 3. Project Structure

The root directory of the backend (`server`) will mostly be comprised of config files. For files relating to the logic/functionality of the project, it will be stores in the `src` directory.

### 3.1 `src/`

This directory has one file, called `server.ts` which is where all route definitions and Express configurations will exist in. Things like `app.get(...)` and `app.post(...)` will be defined here.

Then, I usually have directory which groups similar routes, such as `auth/` for everything authentication related. It would be particularly useful if we reuse helper functions to reduce redundancy, which I usually store all of my helper files in `helper/`.

## 4. Conclusion

That should be enough to get you started with the backend and hopefully, you will be able to start writing Express routes.  More clarifications on how to write Express routes will be done in the workshops. However, feel free to reach out and ask me questions if you have any.