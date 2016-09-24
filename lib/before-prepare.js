var fs = require('fs'),
	path = require('path'),
	_ = require('lodash');

module.exports = function ($logger, $projectData, $usbLiveSyncService) {
	return new Promise(function (resolve, reject) {
		var config = $projectData.$options.argv.config || {},
			env = config['app-env'] || (config['production'] && 'production' || 'development'),
			defaultConfigPath = path.join($projectData.projectDir, 'appconfig/AppConfig'),
			appConfigData = {
				ENV: env
			};

		_.merge(appConfigData, require(defaultConfigPath));

		// check if env config exits
		var envConfigPath = defaultConfigPath + '.' + env;
		if (fs.existsSync(envConfigPath + '.js')) {
			_.merge(appConfigData, require(envConfigPath));
		}

		var script = 'var AppConfig = ' + JSON.stringify(appConfigData, null, 2) + ';',
			envVars = appConfigData.ENV_VARS || {
				ENV_DEVELOPMENT: 'development',
				ENV_TEST: 'test',
				ENV_PRODUCTION: 'production'
			};

		script += '\n\n';

		_.each(envVars, function (value, key) {
			script += 'global.' + key + ' = ' + (env === value && 'true' || 'false') + ';\n';
		});

		script += '\n';

		script += 'module.exports = global.appConfig = AppConfig;';

		fs.writeFileSync(path.join($projectData.projectDir, 'app/AppConfig.js'), script, 'utf8');

		resolve();
	});
};