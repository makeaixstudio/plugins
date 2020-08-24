# AIX Studio Plugins
This is a monorepo containing all core Theia plugins for AIX Studio 2. These plugins are bundled into AIX Studio 2, and most of the actual code is here. Some plugins that are here aren't bundled into AIX Studio 2 for desktop, but are exclusive to AIX Studio 2 Now.
## Building
> **Note**: Builds are now done automatically using GitHub Actions. Pushes to master will run a build and create a release draft.
Builds are done using `vsce`. You need Node.js and NPM to use it.
```
$ npm install -g vsce # installs vsce
$ cd [PLUGIN_TO_BUILD] # where [PLUGIN_TO_BUILD] is the name of the plugin folder
$ vsce package # packages the plugin to a VSIX file
```
VSIX files can be uploaded by maintainers to GitHub Releases.
