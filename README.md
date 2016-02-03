IONIC 2 App base
==========

# Presentation
A starting project for ionic2 based on TypeScript

# Installation
First you need to install the ionic command in version 2:
```bash
$ npm install -g ionic@beta
```

# Create a new project
If you need to create a new project in pure JavaScript:
```bash
$ ionic start myNewproject --v2
```

If you need to create a new project in TypeScript:
```bash
$ ionic start myNewproject --v2 --ts
```

# Execution on desktop
For starting the project on desktop:
```bash
$ ionic serve
```

# Execution on real Android device
- First you need to retrieve the android sdk, then run the android SDK manager and download the last android version
- Then you need to configure the ANDROID_HOME environment variable based on the location of your Android SDK folder.
- You have to add the android platform in ionic:
```bash
$ ionic platform add android
```
- Plug in your device to your computer via USB
- Run: 
```bash
$ ionic run android
```
- The application should be installed to your device and start automatically.
- If you've got a "wrong api version" error, then edit the config.xml file in the source project and change 
the android preference: android-minSdkVersion

# TypeScript compilation in IntelliJ
- First, read this link: https://www.jetbrains.com/idea/help/transpiling-typescript-to-javascript.html
- Basically you need to:
    - Download the typescriptServices.js, lib.d.ts, and lib.es6.d.ts files from https://github.com/Microsoft/TypeScript/.
    - Go to File -> Settings and click TypeScript under Languages & Frameworks
    - Select "Enable TypeScript Compiler"
    - Click "Edit" in the Compiler version area
    - In the Configure TypeScript Compiler dialog box that opens, choose Custom directory and specify the folder 
    where the downloaded typescript files are stored
    - In the "Command line options" input, set this value: "--module "commonjs" --experimentalDecorators"
    - Click "Apply" then "OK"
- The TypeScript compiler should be set correctly.

