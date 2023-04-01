const {execSync} = require("child_process");
const CryptoJS = require("crypto-js");
const fs = require('fs');

const args = process.argv.slice(2);

const config = {
  file: 'config.json',
  cryptFile: 'config.crypt',
  key: args[0],
  action: args[1] || 'encrypt'
}

if (!config.key) {
  console.log('Please specify an encryption key.');
  return;
}

const encrypt = () => {
  execSync('strapi configuration:dump -f ' + config.file);

  const configContent = fs.readFileSync(config.file, 'utf-8');
  let strapiConfig = JSON.parse(configContent);

  strapiConfig = strapiConfig.filter((item) => {
    return item.key.startsWith('plugin_content_manager_configuration_');
  });

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(strapiConfig), config.key).toString();

  fs.writeFileSync(config.cryptFile, encrypted);
  fs.rmSync(config.file);
}

const decrypt = () => {
  const encryptContent = fs.readFileSync(config.cryptFile, 'utf-8');
  const bytes = CryptoJS.AES.decrypt(encryptContent, config.key);

  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  fs.writeFileSync(config.file, decrypted);

  execSync('strapi configuration:restore -f ' + config.file);

  fs.rmSync(config.file);
}

if (config.action === 'decrypt') {
  decrypt();
} else {
  encrypt();
}
