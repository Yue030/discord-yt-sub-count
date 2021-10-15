/* eslint-disable @typescript-eslint/no-explicit-any */

import FS from 'fs';
import readline from 'readline';
import { google as Google, Auth } from 'googleapis';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const SECRET_DIR = 'secret/credentials.json';
const CRENDENTIAL_PATH = 'secret/credentials.json';
const TOKEN_PATH = 'secret/token.json';

// Load client secrets from a local file.
export const credentials: JSON = JSON.parse(
  FS.readFileSync(CRENDENTIAL_PATH, 'utf8'),
);
// console.error('Error loading client secret file:', err)

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {any} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  credentials: any,
  callback: (auth: Auth.OAuth2Client) => void,
): void => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new Google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  // Check if we have previously stored a token.
  FS.readFile(TOKEN_PATH, 'utf8', (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {Auth.OAuth2Client} oAuth2Client The OAuth2 client to get token for.
 * @param {(auth: Auth.OAuth2Client) => void} callback The callback for the authorized client.
 */
const getNewToken = (
  oAuth2Client: Auth.OAuth2Client,
  callback: (auth: Auth.OAuth2Client) => void,
) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          'Error while trying to retrieve access token',
          err,
        );
      if (!token) return console.error(`Access token value error: ${token}`);
      oAuth2Client.setCredentials(token);
      storeToken(token);
      callback(oAuth2Client);
    });
  });
};

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
const storeToken = (token: Auth.Credentials) => {
  try {
    FS.mkdirSync(SECRET_DIR);
  } catch (err: any) {
    if (err?.code !== 'EEXIST') throw err;
  }
  FS.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
};

export default authorize;
