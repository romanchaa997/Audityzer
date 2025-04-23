"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetaMaskWindow = exports.getMetaMask = void 0;
const snap_1 = require("../snap");
const getNotificationEmitter_1 = require("../snap/getNotificationEmitter");
const dialog_1 = require("../snap/dialog");
const addNetwork_1 = require("./addNetwork");
const approve_1 = require("./approve");
const confirmTransaction_1 = require("./confirmTransaction");
const helpers_1 = require("./helpers");
const importPk_1 = require("./importPk");
const lock_1 = require("./lock");
const sign_1 = require("./sign");
const signTypedData_1 = require("./signTypedData");
const switchAccount_1 = require("./switchAccount");
const switchNetwork_1 = require("./switchNetwork");
const unlock_1 = require("./unlock");
const addToken_1 = require("./addToken");
const createAccount_1 = require("./createAccount");
const getMetaMask = (page) => {
    // modified window object to kep state between tests
    const setSignedIn = async (state) => {
        const evaluateFn = (s) => {
            window.signedIn = s;
        };
        await page.evaluate(evaluateFn, state);
    };
    const getSingedIn = () => {
        const evaluateFn = () => window.signedIn !==
            undefined
            ? window.signedIn
            : true;
        return page.evaluate(evaluateFn);
    };
    return new Promise((resolve) => {
        resolve({
            acceptAddNetwork: (0, addNetwork_1.acceptAddNetwork)(page),
            rejectAddNetwork: (0, addNetwork_1.rejectAddNetwork)(page),
            approve: (0, approve_1.approve)(page),
            confirmTransaction: (0, confirmTransaction_1.confirmTransaction)(page, getSingedIn),
            importPK: (0, importPk_1.importPk)(page),
            lock: (0, lock_1.lock)(page, setSignedIn, getSingedIn),
            sign: (0, sign_1.sign)(page, getSingedIn),
            signTypedData: (0, signTypedData_1.signTypedData)(page, getSingedIn),
            switchAccount: (0, switchAccount_1.switchAccount)(page),
            switchNetwork: (0, switchNetwork_1.switchNetwork)(page),
            unlock: (0, unlock_1.unlock)(page, setSignedIn, getSingedIn),
            acceptAddToken: (0, addToken_1.acceptAddToken)(page),
            rejectAddToken: (0, addToken_1.rejectAddToken)(page),
            createAccount: (0, createAccount_1.createAccount)(page),
            helpers: {
                getTokenBalance: (0, helpers_1.getTokenBalance)(page),
                deleteAccount: (0, helpers_1.deleteAccount)(page),
                deleteNetwork: (0, helpers_1.deleteNetwork)(page),
            },
            snaps: {
                invokeSnap: snap_1.invokeSnap,
                getNotificationEmitter: (0, getNotificationEmitter_1.getNotificationEmitter)(page),
                getAllNotifications: (0, snap_1.getAllNotifications)(page),
                installSnap: (0, snap_1.installSnap)(page),
                dialog: (0, dialog_1.createDialogMethods)(page),
            },
            page,
        });
    });
};
exports.getMetaMask = getMetaMask;
/**
 * Return MetaMask instance
 * */
async function getMetaMaskWindow(browser) {
    const metaMaskPage = await new Promise((resolve, reject) => {
        browser
            .pages()
            .then((pages) => {
            for (const page of pages) {
                if (page.url().includes("chrome-extension"))
                    resolve(page);
            }
            reject("MetaMask extension not found");
        })
            .catch((e) => reject(e));
    });
    return (0, exports.getMetaMask)(metaMaskPage);
}
exports.getMetaMaskWindow = getMetaMaskWindow;
