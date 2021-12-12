import { execSync } from "child_process";
const getCliPath = function () {
    if (process.env.NODE_ENV == "test") {
        return "node " + process.env.PWD + "/dist/bin/cli.js";
    } else {
        return process.env.PWD + "/node_modules/.bin/doppler-config-sync";
    }
};

const getSecrets = function (options: DopplerConfigSyncGetParametersOptions): DopplerConfigSecrets {
    if (options.token) {
        let flagStr = Object.keys(options)
            .map((k) => "--" + k.toLowerCase() + ' "' + options[k] + '"')
            .join(" ");
        try {
            let result = execSync(`${getCliPath()} ` + flagStr).toString("utf-8");
            let resultObj: any = JSON.parse(result);
            if (resultObj && !resultObj.error) {
                return resultObj;
            }
        } catch (e) {
            if (e.output) {
                console.error(e.output.toString("utf-8"));
            }
            return {};
        }
    } else {
        throw new Error("No token specified");
    }
};
export { getSecrets };
export default getSecrets;
interface DopplerConfigSyncGetParametersOptions {
    token: string;
    prefix?: string;
}
interface DopplerConfigSecrets {
    [key: string]: string;
}
