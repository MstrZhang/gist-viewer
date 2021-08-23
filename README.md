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
  - after modifying `.env.local` you should re-run step 3 to take the changes
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

## design thoughts

main design decision is following the [single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle):

- every component should do just 1 thing and should not have multiple functions / roles in the application
  - each component only does 1 thing
  - using state only in components that need it and using props otherwise

directory structure design decisions:

- mostly just grouping files of similar purpose (i.e. tests, components, constants)
  - for a more complex project, would probably do more nesting in the components section (e.g. if some components were made up of many smaller components)
  - in this case, trying to avoid over-nesting to make it easier to write relative imports between components
- writing APIs in JSX (i.e. in components) vs separating to separate API file (e.g. similar to angular services)
  - mostly a personal preference but prefer to couple JSX with APIs; value the pros of this approach over the cons:
    - pros:
      - easier to find API calls if something needs to be changed later (e.g. if you want to change how search functions you know it will probably be in the SearchBar component)
      - easier to handle components that use the same API but have different after effects (e.g. SearchBar and SearchPagination use the same API but have different callback effects)
      - files are inherently less coupled and more cohesive (e.g. if using a service component, the component using the service is inherently coupled with the service)
        - changes to the main component may result in changes to the service as well (i.e. 2 places) as opposed to just the main component if APIs are written in the component
    - cons:
      - more code duplication (e.g. SearchBar and SearchPagination use the same API but the call is duplicated across two components)

axios vs fetch:

- using axios over fetch is mostly due to familarity with the library but axios offers some advantages over fetch:
  - default JSON parsing
    - fetch requires use of `res.json()` to convert response to JSON; axios automatically returns JSON objects by default
  - easier to set up global headers in axios
    - e.g. if you have a token you need to use for every request, this is a little more cumbersome to set up in contrast to axios
  - axios comes with method aliases
    - e.g. can use things like `axios.get()` or `axios.post()` as opposed to constructing options objects
    - this also comes with the added benefit of making the syntax nicer especially for very simple requests
  - wider browser support
    - axios supports even older browsers like IE11 which fetch does not (fetch requires a polyfill for older browsers)

use of eslint:

- want to follow the paradigm that code style should look the same no matter who writes the code
  - makes the code easier to read because it's style is predictable
  - eliminates a lot of unfavourable code smells in coding styles and in some cases mistakes
    - e.g. no confusing operators (like nested ternaries), no `console.log()` left in the code, etc ...
  - linting can be easily integrated into a pipeline like unit tests and is another step in producing more performant code
- using a somewhat modified version of airbnb's configuration
  - ignoring camelCase only for constants (using UPPER_CASE for constants; easier to visually see user-made constants)

things i would have changed if i had more time:

- SearchPagination
  - GitHub does not provide an API to retrieve the total number of pages of a user's public gists
    - to paginate, you constantly have to peek the next page to see if there is any data
  - maybe would have implemented this as an infinite scroll instead of a pagination
    - would not have to show UI elements to load more gists
    - would not have to peek next gist
      - if the user doesn't scroll down, no additional search request would be needed
      - if there is no data in the next page, React would not render anything
- UI design
  - maybe would have used a frontend framework to make the components look nicer
  - maybe would have shown small preview of gist content in each gist
