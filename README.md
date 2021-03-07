# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Important

This project was created by following [Morgan Page](https://www.udemy.com/user/morganpage2/)'s course

### [React - Learn React with Hooks by creating a Roguelike game](https://www.udemy.com/course/react-learn-react-with-hooks-by-creating-a-roguelike-game/)

on Udemy, where "Coding a roguelike game is  a great way to learn the fundamentals of React, Hooks and useful generic game concepts like movement, combat and inventories."

Then I added some of my own interpretations. Which may or may not prove to be a good idea, but these include;

* Creating the world map into its own class with clean get, put and delete methods etc
* Adding specific entity types that can exist in the world
* Guided randomisation of the location at which things get spawned into the world
* Levels (currently, we only descend through the dungeon)
* Storing each level's map when we descend to the next
* Used non-traditional rogue-like symbols (I think - it's not my usual genre) for creatures, because a goblin wears a pointy hat and Orcs probably have tusks, right?

Anyway as a result I've probably created some fun bugs for you to discover. And I'm pretty sure these interpretations deviate a bit from the React Warrior's code of conduct, but I don't care as it's the game-dev elements that I'm having more fun with TBH.

And, although I'm sharing this code, not much of it is really mine, so please bear that in mind if you choose to use any of it. And definitely look at Morgan's course too, if you want to see how it should have been done :)

Finally, if you're _really_ curious, [give it a spin via github pages](https://justinpinner.github.io/learn-react-hooks-roguelike-game/index.html)

### Big thanks also go to...

This really useful [set of instructions](https://github.com/gitname/react-gh-pages) for getting a React app to deploy to github pages.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
