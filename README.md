CROSS PLATFORM NFC
==========

# IDE
IntelliJ v15.0.3 or later is recommended for a better TypeScript support

# Structure
- Angular v2.0.0-beta.3
- Ionic Framework v2.0.0-alpha.54
- ZoneJS v0.5.11

# Installed cordova plugins
- cordova-plugin-barcodescanner
- cordova-plugin-keyboard
- cordova-plugin-statusbar
- cordova-plugin-vibration
- phonegap-nfc
- cordova-plugin-whitelist

# Presentation
A starting project for ionic2 based on TypeScript

# Installation
You need to install tsd (Type Script Definition Manager) required by zonejs in administrator mode:
```bash
$ npm install -g tsd
```

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

# Install cordova command
```bash
$ npm install -g cordova
```

# Install a new plugin
Always use cordova (not phonegap) to add a new plugin
```bash
$ cordova plugin add cordova-plugin-barcodescanner
```
Edit the config.xml file and add a new entry:
<gap:plugin name="cordova-plugin-barcodescanner" source="npm" />

# Execution on real Android device
- First you need to retrieve the android sdk, then run the android SDK manager and download the last android version
- Then you need to configure the ANDROID_HOME environment variable based on the location of your Android SDK folder.
- You have to add the android platform in ionic
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

# TypeScript compilation in IntelliJ v < 15.0.3
- First, read this link: https://www.jetbrains.com/idea/help/transpiling-typescript-to-javascript.html
- Basically you need to:
    - Install TypeScript via npm
    ```bash
    $ npm install -g typescript 
    ```
    - Download the typescriptServices.js, lib.d.ts, and lib.es6.d.ts files from https://github.com/Microsoft/TypeScript/.
    - Go to File -> Settings and click TypeScript under Languages & Frameworks
    - Set the NodeJS installation folder path
    - Select "Enable TypeScript Compiler"
    - Click "Edit" in the Compiler version area
    - In the Configure TypeScript Compiler dialog box that opens, choose Custom directory and specify the folder 
    where the downloaded typescript files are stored
    - In the "Command line options" input, set this value: "--module "commonjs" --experimentalDecorators"
    - Click "Apply" then "OK"
- The TypeScript compiler should be set correctly.

# TypeScript compilation in IntelliJ v >= 15.0.3
- First, read this link: https://www.jetbrains.com/idea/help/transpiling-typescript-to-javascript.html
- Basically you need to:
    - Install TypeScript via npm
    ```bash
    $ npm install -g typescript 
    ```
    - Go to File -> Settings and click TypeScript under Languages & Frameworks
    - Set the NodeJS installation folder path
    - Select "Enable TypeScript Compiler"
    - Select "Use tconfig.json"
    - Click "Apply" then "OK"
- The TypeScript compiler should be set correctly.