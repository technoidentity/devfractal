# Getting Started

Please Note: Following instructions will work on WSL 2 on Windows, Ubuntu or
macos. These won't work on. windows native

## Setup repository

Clone the repository:

```bash
git clone https://github.com/pervezfunctor/wurkspace.git
```

If you don't have `node` installed, please run:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm env use --global 16
```

If you do have `node` installed, but don't have `pnpm` installed, please run:

```bash
npm install -g pnpm npm
```

Install all the packages every time you run `git pull`:

```bash
pnpm install
```

## Configure WSL 2

You need to run the project in a
[devcontainer](https://code.visualstudio.com/docs/remote/containers).

1. Install [docker desktop](https://www.docker.com/products/docker-desktop)
2. Configure it with `WSL 2` on windows by following the
   [docker WSL2 setup instructions](https://docs.docker.com/desktop/windows/wsl/)
3. Install all the recommended packages when `visual studio code` prompts
   you(available in `.vscode/extensions.json`)

Open the project in `visual studio code`, press `Ctrl+Shift+P` and type 'Reopen
in container'

## Configure database

You might need to use the following database commands every time you run
`git pull`:

Update the schema and reset the database by running the following command(highly
recommended):

```bash
pnpm db:reset
```

Optionally, run the following commands individually:

```bash
# generate types for prisma schema:
pnpm prisma generate
# update the database schema:
pnpm prisma db push
# Seed the database:
pnpm prisma db seed
```

You could also execute above three commands using the following command:

```bash
pnpm db # push schema, seed and generate types(doesn't reset database)
```

Optionally, add the `DATABASE_URL` environment variable to the `.env` file, if
needed. By default, this will be devcontainer postgres database url.

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/posgres"
```

## Configure GCP

1. Set the environment variables in the `.env` file. Currently the following
   values must be provided:

   ```bash
   GOOGLE_ID=<YOUR OWN GOOGLE DEVELOPER ID FROM CONSOLE>
   GOOGLE_SECRET=<YOUR OWN GOOGLE SECRET ID FROM CONSOLE>
   ```

2. You need to add the following scopes:

   ```text
   https://www.googleapis.com/auth/calendar.events.readonly
   https://www.googleapis.com/auth/calendar.readonly
   ```

## Common commands

To run development server:

```bash
pnpm dev
```

To run tests and watch for changes:

```bash
pnpm test
```

Open the terminal inside `Visual Studio Code`, and run the following command to
continuously watch for type errors:

```bash
pnpm types
```

**Open [http://localhost:3000](http://localhost:3000) with your browser to see
the result.**

## Contributing

Create a branch, like:

```bash
git checkout -b <your-branch>
```

Implement your feature or fix an issue. Commit your changes. Rebase changes from
the `main` branch. Then run the following before doing `git push` and sending a
pull request:

```bash
git checkout main
git pull
git checkout <your-branch>
git rebase main
pnpm install
pnpm ci
```

## Approach for creating pages for the app

1. Divide the page into components.
2. Implement each component's static structure for all the components. Make sure
   manager approves UI with static structure.
3. Once approved, define props for each of the components. Make sure you define
   event handlers.
4. Use a static object or a fake object created using faker.js to test
   components with props.
5. Decide if the components need state. If yes, define state and use storybook
   to test or document components, especially if the component is reusable.
6. If state needs to be shared between unrelated components(not parent/child),
   use `jotai`.
7. If data is needed from server use `MSW` to define mock data and use `SWR` to
   fetch data.
8. Implement most interactions using `MSW`. If possible use playwright to test
   fetch logic.
9. Now use `next.js` api routes/handlers along with `prisma` to implement all of
   msw handlers, making sure nothing breaks.
10. Refactor. Mostly done by my team.

## Notes about deciding between controlled & uncontrolled components

1. Prefer controlled components, especially for simple or leaf(no user defined
   children) components.
2. All reusable components must be controlled components.
3. If needed, implement the component so that it can be both controlled or
   uncontrolled.
4. All CRUD forms should be uncontrolled components.
5. All page components must be uncontrolled components.
6. Large components, which aren't reusable are generally uncontrolled
   components.
7. Components needing server side data are usually uncontrolled components.
8. Components which need jotai state are uncontrolled components.

## How to run Supabase locally

Use the following commands from the project root folder to manage Supabase on
your development machine:

```bash
# Start all Supabase services(studio, postgres, realtime, etc.)
pnpm supabase:up
# pnpm install && pnpm db! && rm -rf .next && pnpm dev

# Shutdown all Supabase services
pnpm supabase:down
# Check Supabase container logs for debugging purposes
pnpm supabase:logs
# Remove containers & volumes that are currently not up(Supabase or otherwise)
# Useful to reset everything and recreate containers from scratch
# Stop containers first for a full clean
pnpm docker:clean
```

## How to run app & postgres docker containers from the command-line

Run the following commands to start the containers & run development server
inside app container:

```bash
cd .devcontainer
docker-compose up -d
docker exec -u node -it wurkspace_app zsh
cd wurkspace
# pnpm install && pnpm db:reset && pnpm db
npm run dev
```

Open the url [localhost:3000](localhost:3000) in the web browser.

## Resources

### Javascript

1. [JavaScript Promises in Depth](https://egghead.io/courses/javascript-promises-in-depth)
2. [Javascript promises for asynchronous programming [ES6]](https://exploringjs.com/impatient-js/ch_promises.html)
3. [Asynchronous JavaScript with async/await](https://egghead.io/courses/asynchronous-javascript-with-async-await)

### Typescript

1. [superstruct](https://docs.superstructjs.org/guides/01-getting-started)

### React

1. [Thinking in React](https://beta.reactjs.org/learn/thinking-in-react)
2. [Next.js Tutorial for Beginners](https://www.youtube.com/playlist?list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw)

### State Management

1. [React Data Fetching with Hooks using SWR](https://www.youtube.com/watch?v=oWVW8IqpQ-A)
2. [Create an Optimistic UI in React with SWR](https://egghead.io/courses/create-an-optimistic-ui-in-react-with-swr-1024)

### Mocking and Testing

1. [Mocking REST API](https://mswjs.io/docs/getting-started/mocks/rest-api)
2. [Use Mock Service Worker and Test Like a User](https://www.youtube.com/watch?v=v77fjkKQTH0)
