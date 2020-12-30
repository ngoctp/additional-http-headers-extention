var enabled = null;
var headers = null;

var updateConfiguration = function() {
    chrome.storage.sync.get({
        enabled: true,
        headers: null
    }, function (items) {
        enabled = items.enabled;
        headers = items.headers;
    });
}

updateConfiguration();
setInterval(updateConfiguration, 5000);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        if (enabled) {
            if (headers != null) {
                for (var i = 0; i < headers.length; i++) {
                    if (headers[i].name) {
                        details.requestHeaders.push({
                            name: headers[i].name,
                            value: headers[i].value,
                        });
                    }
                }
            }
        }
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders'/*, 'extraHeaders'*/]
    // uncomment 'extraHeaders' above in case of special headers since Chrome 72
    // see https://developer.chrome.com/extensions/webRequest#life_cycle_footnote
);
