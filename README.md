# gists viewer

this react project reads gists data from GitHub's public API and displays all of a given user's public gists (if they have any)

## requirements

- npm (6.14.4+)
- nodejs (10.19.0+)
- a GitHub personal access token
  - steps to create a personal access token: https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token
  - using a personal access token is not necessary but without one you are limited to 60 requests per hour
    - using a personal access token ups this to 5000 per hour

## project dependencies

- react
- typescript
- axios (for HTTP requests)
- dev dependencies:
  - eslint (for linting and code formatting)
  - jest (for unit testing)

## building

1. add your GitHub token to the variable in `.env.local`
  - NOTE: `.env` is still visible to the end-user (environment variables are embedded into the build; can still be viewed by inspecting) so this method is not particularly favourable
    - in a real develompent environment, environment secrets would be handled differently (e.g. using the backend as a proxy, ...)
2. install dependencies using `npm install`
3. run using `npm start`
  - app opens on [http://localhost:3000](http://localhost:3000)

## running tests

1. run the test suite using `npm run test`

## using the application

- search for a user's gists by using the input bar and clicking submit to make a request
- gists are displayed as a list of the files that make up the gist
  - the name of the gist is the gist's description (if there is one)
  - clicking on the gist file will download the gist
- the latest 3 forks (if there are any) are displayed as the avatars of the users who have forked the gist
  - clicking on the avatar will open the fork in a new tab
