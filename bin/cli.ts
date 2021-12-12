#!/usr/bin/env node

import yargs from "yargs";
import axios from "axios";
async function initCli(): Promise<DopplerConfigSyncCliOptions> {
    return yargs(process.argv.slice(2))
        .options({
            token: { type: "string", default: process.env.DOPPLER_TOKEN, describe: "Doppler access token token", alias: "p" },
            prefix: { type: "string", describe: "Only include secrets with prefix", alias: "k" }
        })
        .demandOption("token", "Missing doppler access token.")
        .version(false).argv;
}

let getAllSecrets = async (opts: DopplerConfigSyncCliOptions): Promise<DopplerConfigSecrets> => {
    let token = opts.token || process.env.DOPPLER_TOKEN;
    if (!token) {
        throw new Error("Missing doppler access token. Either provide throught a DOPPLER_TOKEN environment variable or in the function arguments.");
    }
    const response = await axios.get(`https://${token}@api.doppler.com/v3/configs/config/secrets/download?format=json`);
    if (response.data) {
        let jsonConfig = response.data;
        let filteredConfig: DopplerConfigSecrets = {};
        Object.keys(jsonConfig).forEach((k) => {
            if (opts.prefix) {
                if (k.indexOf(opts.prefix) === 0) {
                    filteredConfig[k] = jsonConfig[k];
                }
            } else {
                filteredConfig[k] = jsonConfig[k];
            }
        });
        return filteredConfig;
    } else {
        throw new Error("Could not load config");
    }

    // If executed as a script
};
initCli().then((opts) =>
    getAllSecrets(opts)
        .then((newEnv) => {
            console.log(JSON.stringify(newEnv));
            process.exit(0);
        })
        .catch((e) => {
            console.log(JSON.stringify({ error: e }));
            process.exit(1);
        })
);
interface DopplerConfigSyncCliOptions {
    token?: string;
    prefix?: string;
}
interface DopplerConfigSecrets {
    [index: string]: string;
}
