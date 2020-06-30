import { join } from 'path';
import { v4 } from 'uuid';
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'fs-extra';

try {
  console.log(`Applying application version`);

  const buildPath = join(__dirname, '../../dist/build');
  const assetsPath = join(buildPath, 'assets');

  if (!existsSync(assetsPath)) {
    mkdirSync(assetsPath);
  }

  const versionJson = {
    hash: v4()
  };

  writeFileSync(join(assetsPath, 'version.json'), JSON.stringify(versionJson));

  const files = readdirSync(buildPath);
  const jsRegex = /\.js$/;

  const applyApplycationVersion = (file: string, version: string): string => {
    return file.replace(new RegExp('APPLICATION_BUILD_VERSION_HASH', 'g'), version);
  };

  files.forEach((fileOrDirectoryName: string) => {
    const buildFilePath = join(buildPath, fileOrDirectoryName);

    if (jsRegex.test(fileOrDirectoryName)) {
      console.log(`Applying application version in ${fileOrDirectoryName}`);

      let jsFile = readFileSync(buildFilePath, 'utf8');

      jsFile = applyApplycationVersion(jsFile, versionJson.hash);

      writeFileSync(buildFilePath, jsFile);
    }
  });
}
catch (error) {
  console.log('Error with post build: ', error);
  process.exit(1);
}
