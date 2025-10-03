import { registerRootComponent } from "expo";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App)
// and sets up the environment for both Expo Go and native builds. Using an
// explicit root entry (instead of expo/AppEntry.js) keeps module resolution
// correct under pnpm's nested node_modules layout.
registerRootComponent(App);
