[OUTDATED] CROSS PLATFORM NFC [![Build Status](https://travis-ci.org/RedFroggy/ionic2-nfc-app.svg?branch=master)](https://travis-ci.org/RedFroggy/ionic2-nfc-app)
==========

# Presentation
An NFC Reader application based on ionic2 and TypeScript (ES6)

# Screenshots
![image](http://i.imgur.com/zHDltDZ.png?2)
![image](http://i.imgur.com/e3PT0fC.png?1)
![image](http://i.imgur.com/PL38LTB.png?1)

# IDE
IntelliJ v15.0.3 or later is recommended for a better TypeScript support

# Features
- JWT authentication
- Left menu
- Login
- Remember me (user saved in local storage)
- Scan an nfc tag
- Save a tag in local storage
- List all saved tags
- My account
- Language selection
- i18n application: French and english with dynamic reload
- Unit tests
   

# Stack
- Angular v2
- Ionic Framework v2
- Webpack
- Karma
- Jasmine
- PhantomJS
- Angular translate v2

# Project Structure

```
- app: Application files (TypeScript)
    -- app.ts: Ionic2 entry point
    -- classes: Common classes
    -- pages: Ionic views
        --- app.html
        --- login
            ---- login.ts
            ---- login.scss
            ---- login.html
        --- account
        --- nfc
        --- qr
        --- tags
    -- pipes: Angular2 @Pipe components
    -- utils: Utility classes
- www: Assets folder
    -- index.html: Entry point
    -- build (not in git repository): Production folder where sources are minified
    -- css
    -- i18n: 18n files
        --- en.json
        --- fr.json
    -- img: Images of the application
    -- js
    -- res
    -- spec: Unit tests folder
        --- mocks: Cordvoa api mocks
        --- src
- typings: TypeScript interfaces for libraries
    -- cordova
    -- jasmine
    -- lodash
    -- moment
	-- phonegap-nfc
- platforms (not in git repository): Installed platforms (android, ios, etc..) using ```$ionic add platform``` command
- reports (not in git repository): Unit tests reports
    -- junit (used by jenkins)
    -- html
- coverage (not in git repository): Coverage reports
    -- Format text, json ,html and cobertura (xml)
- doc (not in git repository): Generated TypeScript documentation
- node_modules (not in git repository): NPM dependencies
- plugins (not in git repository): Cordova plugins
    -- cordova-plugin-barcodescanner
    -- cordova-plugin-statusbar
    -- cordova-plugin-vibration
    -- phonegap-nfc
    -- cordova-plugin-whitelist
- ionic.config.js: Ionic configuration file
- spec-bundle.js: Used for unit tests only with Karma, webpack and ES6
- karma.conf.js: Karma configuration file for unit tests
- webpack.test.config.js: Build configuration file used for unit tests
- webpack.config.js: Build configuration file
- tsconfig.json: TypeScript configuration file
- tslint.json: TSLint configuration file
- typedoc.json: TypeDoc configuration file
- package.json: For managing npm dependencies
    -- Scripts: ```$ npm test``` for executing unit tests through karma
- config.xml: Phonegap configuration file
- resources: Icons and splash resources for every platforms
```


# Installation
Install the node dependencies:
```bash
$ npm install
```
You need to install the ionic command in version 2:
```bash
$ npm install -g ionic@beta
```
You need to install the karma command:
```bash
$ npm install -g karma
```
You need to install the cordova command
```bash
$ npm install -g cordova
```

# Typings
To search for typings :
```bash
$ typings search jasmine
```

To add a typing :
```bash
$ typings install jasmine --save --ambient
```
Files will be added to the typings folder. 
```

# Execution on desktop
For starting the project on desktop:
```bash
$ ionic serve
```

# Install the following cordova plugins
Always use cordova (not phonegap) to add a new plugin
```bash
$ cordova plugin add cordova-plugin-barcodescanner
$ cordova plugin add cordova-plugin-statusbar
$ cordova plugin add cordova-plugin-vibration
$ cordova plugin add cordova-plugin-whitelist
$ cordova plugin add phonegap-nfc
```

Edit the config.xml file and add the following entries:
```bash
<gap:plugin name="phonegap-nfc" source="npm" />
<gap:plugin name="cordova-plugin-statusbar" source="npm" />
<gap:plugin name="cordova-plugin-barcodescanner" source="npm" />
<gap:plugin name="cordova-plugin-whitelist" source="npm" />
```

# Allow external links
To allow externals links such as mailto,tel,sms etc:
Add allow intents in the config.xml files:
```bash
<allow-intent href="mailto:*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
```

# Execution on real Android device
- First you need to retrieve the android sdk, then run the android SDK manager and download the last android version
- Then you need to configure the ANDROID_HOME environment variable based on the location of your Android SDK folder.
- You have to add the android platform in ionic
```
$ ionic platform add android
```
- Plug in your device to your computer via USB
- Run: 
```
$ ionic run android
```
- The application should be installed to your device and start automatically.
- If you've got a "wrong api version" error, then edit the config.xml file in the source project and change 
the android preference: android-minSdkVersion

# TypeScript compilation in IntelliJ v older than 15.0.3
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

# TypeScript compilation in IntelliJ v 15.0.3 or later
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

# Unit tests
Unit tests are using:
- Webpack (webpack.test.config.js)
- Karma (karma.conf.js)
- Jasmine
Tests file are under www/spec folder with suffix .spec.ts

To run tests: 
```bash
$ npm run test
```
Generate reports in junit and HTML.

To run test in browser mode, edit the karma.conf.js file and set 'singleRun' property to false

# Quality code
TSLint checks TypeScript code for errors, readability and maintainability.
tslint.json is the configuration file for TSLint
To run TSLint:
```bash
$ npm run quality
```
