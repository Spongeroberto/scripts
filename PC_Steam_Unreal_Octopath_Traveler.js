// ==UserScript==
// @name         Octopath Traveler
// @version      0.0.1
// @author       spongerobertosquarepantalones
// @description  Steam
//
// https://store.steampowered.com/app/921570/OCTOPATH_TRAVELER/
// ==/UserScript==

const __e = Process.enumerateModules()[0];
const handler = trans.send(s => s, '700');

(function () {
    attach('DialogueHook', 'E8 17 B6 83 01', 'rdx'); // works but is spammy

    function attach(name, pattern, register) {
        const results = Memory.scanSync(__e.base, __e.size, pattern);
        if (results.length === 0) {
            console.error(`[${name}] Hook not found!`);
            return;
        }
        const address = results[0].address;
        console.log(`[${name}] Found hook ${address}`);
        Interceptor.attach(address, function (args) {
            //            console.log(name);
            const text = this.context[register].readUtf16String();
            //            handler(text);
            console.log(name, "'", text, "'");
        });
    }
})();