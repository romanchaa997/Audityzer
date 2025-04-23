"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSnapInstalled = exports.installSnap = void 0;
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
const setupActions_1 = require("../setup/setupActions");
const install_utils_1 = require("./install-utils");
const utils_1 = require("./utils");
const installSnap = (flaskPage) => async (snapIdOrLocation, opts) => {
    (0, utils_1.flaskOnly)(flaskPage);
    //need to open page to access window.ethereum
    const installPage = await flaskPage.browser().newPage();
    await installPage.goto(opts?.installationSnapUrl ?? constants_1.EXAMPLE_WEBSITE);
    let snapServer;
    if (fs_1.default.existsSync(snapIdOrLocation)) {
        //snap dist location
        snapServer = await (0, install_utils_1.startSnapServer)(snapIdOrLocation);
        snapIdOrLocation = `local:${(0, install_utils_1.toUrl)(snapServer.address())}`;
    }
    const installAction = installPage.evaluate(({ snapId, version }) => window.ethereum.request({
        method: "wallet_requestSnaps",
        params: {
            [snapId]: {
                version: version ?? "latest",
            },
        },
    }), { snapId: snapIdOrLocation, version: opts?.version });
    await flaskPage.bringToFront();
    await flaskPage.reload();
    try {
        const privacyWarningModal = await flaskPage.$('[data-testid="snap-privacy-warning-scroll"]');
        if (privacyWarningModal)
            await (0, setupActions_1.closePrivacyWarningModal)(flaskPage);
    }
    catch (e) {
        //ignored if modal is not present
    }
    await (0, helpers_1.clickOnButton)(flaskPage, "Connect");
    await flaskPage.waitForSelector(".pulse-loader", { visible: false });
    await flaskPage.waitForSelector(".snap-permissions-list");
    await (0, helpers_1.clickOnButton)(flaskPage, "Install");
    const isAskingForPermissions = await (0, utils_1.isFirstElementAppearsFirst)({
        selectorOrXpath1: `.checkbox-label`,
        selectorOrXpath2: `.pulse-loader`,
        page: flaskPage,
    });
    if (isAskingForPermissions) {
        await flaskPage.waitForSelector(".checkbox-label", {
            visible: false,
        });
        for await (const checkbox of await flaskPage.$$(".checkbox-label")) {
            await checkbox.click();
        }
        await (0, helpers_1.clickOnButton)(flaskPage, "Confirm");
        await flaskPage.waitForSelector(".pulse-loader", { visible: false });
    }
    await flaskPage.waitForSelector('[data-testid="page-container-footer-next"]:not([disabled])');
    await (0, helpers_1.clickOnButton)(flaskPage, "page-container-footer-next");
    for (const step of opts?.customSteps ?? []) {
        await step(flaskPage);
    }
    const result = await installAction;
    await installPage.waitForTimeout(1000);
    await installPage.close({ runBeforeUnload: true });
    if (!(snapIdOrLocation in result)) {
        throw new Error("Failed to install snap");
    }
    snapServer.close();
    return snapIdOrLocation;
};
exports.installSnap = installSnap;
async function isSnapInstalled(flaskPage, snapId) {
    await flaskPage.bringToFront();
    await (0, helpers_1.profileDropdownClick)(flaskPage);
    await (0, helpers_1.clickOnElement)(flaskPage, "Settings");
    await (0, helpers_1.clickOnElement)(flaskPage, "Snaps");
    let found = false;
    try {
        await flaskPage.waitForXPath(`//*[contains(text(), '${snapId}')]`, {
            timeout: 5000,
        });
        found = true;
    }
    catch (e) {
        found = false;
    }
    await (0, helpers_1.clickOnLogo)(flaskPage);
    return found;
}
exports.isSnapInstalled = isSnapInstalled;
