const { getSecrets } = require("../dist");

it("should load DOPPLER_ENVIRONMENT of cli-test", async () => {
    let params = getSecrets({ token: process.env.DOPPLER_TOKEN });
    expect(params.DOPPLER_ENVIRONMENT).toEqual("cli-test");
});

it('should load only load keys with prefix "DOPPLER_"', async () => {
    let params = getSecrets({ token: process.env.DOPPLER_TOKEN, prefix: "DOPPLER_" });
    Object.keys(params).forEach((k) => {
        expect(k).toMatch(new RegExp("^" + process.env.TEST_PREFIX + ".*$"));
    });
});
