import { join } from 'path';
import { mkdirSync, readdirSync, readFileSync, writeFileSync,
  statSync, copyFileSync, existsSync, removeSync, copySync } from 'fs-extra';

enum ENV_VARS {
  GOTO_ANGULAR_ENVIRONMENT_NAME = 'GOTO_ANGULAR_ENVIRONMENT_NAME',
  GOTO_ANGULAR_API_URL = 'GOTO_ANGULAR_API_URL'
}

try {
  console.log(`Applying ${process.env[ENV_VARS.GOTO_ANGULAR_ENVIRONMENT_NAME]} environment variables`);

  const buildPath = join(__dirname, '../../dist/angular');
  const envBuildPath = join(__dirname, '../../dist/build');

  // Clean environment build
  if (existsSync(envBuildPath)) {
    removeSync(envBuildPath);
  }

  mkdirSync(envBuildPath);

  // Copy and replace unique string placeholders with environment variables
  const files = readdirSync(buildPath);
  const jsRegex = /\.js$/;

  const applyEnvironmentVariable = (file: string, variableName: string): string => {
    return file.replace(new RegExp(variableName, 'g'), process.env[variableName]);
  };

  files.forEach((fileOrDirectoryName: string) => {
    const buildFilePath = join(buildPath, fileOrDirectoryName);
    const envBuildFilePath = join(envBuildPath, fileOrDirectoryName);

    if (jsRegex.test(fileOrDirectoryName)) {
      console.log(`Applying environment variables in ${fileOrDirectoryName}`);

      let jsFile = readFileSync(buildFilePath, 'utf8');

      jsFile = applyEnvironmentVariable(jsFile, ENV_VARS.GOTO_ANGULAR_API_URL);

      writeFileSync(envBuildFilePath, jsFile);
    }
    else {
      console.log(`Copying content of the ${fileOrDirectoryName}`);

      const stats = statSync(buildFilePath);

      if (stats.isDirectory()) {
        copySync(buildFilePath, envBuildFilePath);
      }
      else {
        copyFileSync(buildFilePath, envBuildFilePath);
      }
    }
  });
}
catch (error) {
  console.log('Error with post build: ', error);
  process.exit(1);
}
