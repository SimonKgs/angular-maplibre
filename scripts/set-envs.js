const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config()


const folderPath = './src/environments'

const targetPath = `${ folderPath }/environments.ts`;

const envFileContent = `
export const environment = {
    GEOAPIFY_KEY: "${ process.env['GEOAPIFY_KEY'] }"
}
`;


mkdirSync(folderPath, { recursive: true });

writeFileSync( targetPath, envFileContent );