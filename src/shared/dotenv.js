/*
dotenv loader. This file is used to load environment variables from a .env file.
It reads the file, parses each line, and sets the environment variables accordingly.

Usage:
  loadEnv();
  if (process.env.PAT) {
    console.log("PAT found in .env.Using personal access token for GitHub API requests.");
  }
*/
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function loadEnv(envPath = '../../.env') {
  try {
    // Read the .env file
    const envFile = readFileSync(join(__dirname, envPath), 'utf8');

    // Parse each line
    envFile.split('\n').forEach(line => {
      // Skip empty lines and comments
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) return;

      // Split on first equals sign
      const equalsIndex = trimmedLine.indexOf('=');
      if (equalsIndex === -1) return;

      const key = trimmedLine.slice(0, equalsIndex).trim();
      let value = trimmedLine.slice(equalsIndex + 1).trim();

      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Set environment variable
      process.env[key] = value;
    });
  } catch (error) {
    console.error('Error loading .env file:', error.message);
  }
}
