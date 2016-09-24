# AppConfig

Export environment specific configuration for NativeScript projects

### How to install

```
$ tns install nativescript-dev-appconfig
```

The above command installs this module and installs the necessary NativeScript hooks. 

### How to use

Create a directory named `appconfig` at project's root. 

Create a file named `AppConfig.js` under `appconfig`, that should export a valid object which will be considered as default configuration set.

### Example

```
module.exports = {
    "ENABLE_LOGGER": true,
    "BASE_URL": "http://dev.example.com/v3/"
};
```

You may keep different configuration set for different environment as `AppConfig[.environment].js`

### Examples

#### AppConfig.test.js

```
module.exports = {
    "BASE_URL": "http://test.example.com/v3/"
};
```

#### AppConfig.production.js

```
module.exports = {
    "ENABLE_LOGGER": false,
    "BASE_URL": "http://example.com/v3/"
};
```

Based on the environment name given with the `config` parameter in `tns` command, this hook will pickup the right configuration set (if exists) and merge the same with default configuration.

### Example

```
$ tns run ios --config.app-env=test
```

The command above will merge the `default` configuration set with `test` configuration, then wrtites `AppConfig.js` to `app` directory.

#### Example (ProjectRoot/app/AppConfig.js)

```
var AppConfig = {
  "ENV": "test",
  "ENABLE_LOGGER": true,
  "BASE_URL": "http://test.example.com/v3/"
};

global.ENV_DEVELOPMENT = false;
global.ENV_TEST = true;
global.ENV_PRODUCTION = false;

module.exports = global.appConfig = AppConfig;
```
