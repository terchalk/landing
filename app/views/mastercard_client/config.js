import path from 'path';

export default {
  CONSUMER_KEY: 'cXnkFzp28Qfzd7D6ihkiKP8r0v4WOVpEoDTnh3Vk68885e51!e21a7f881b0d45a197829b5ad69b3f720000000000000000',
  KEYSTORE_PATH: path.join(__dirname, './mastercard_client.p12'),
  PROTOS_FOLDER_PATH: './protos',
  KEY_PASSWORD: 'client',
  KEY_ALIAS: 'client',
  APP_ID: 'TM18',
  SERVER_HOST: 'localhost',
  SERVER_PORT: 3000,
};