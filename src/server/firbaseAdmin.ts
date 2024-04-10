import * as firebaseAdmin from "firebase-admin";
import { log } from "../utils/Log";

const privateKey = process.env["PRIVATE_KEY"]
  ? process.env["PRIVATE_KEY"].replace(/\\n/gm, "\n")
  : undefined;
const clientEmail = process.env["CLIENT_EMAIL"];
const projectId = process.env["PROJECT_ID"];
const databaseURL = process.env["DATABASE_URL"];

if (!privateKey || !clientEmail || !projectId || !databaseURL) {
  log(
    `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`,
    'critical'
  );
  throw new Error('Failed to load Firebase credentials.');
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: privateKey,
      clientEmail,
      projectId,
    }),
    databaseURL,
  });
}

export { firebaseAdmin };
