// Saves options to chrome.storage
function save_options() {
    var enabled = document.getElementById('enabled').checked;
    var name = document.getElementById('name').value;
    var value = document.getElementById('value').value;
    chrome.storage.sync.set({
        enabled: enabled,
        headers: [
            {
                name: name,
                value: value
            }
        ]
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        enabled: true,
        headers: [
            {
                name: 'your-custom-header',
                value: 'hi there'
            }
        ]
    }, function (items) {
        document.getElementById('enabled').checked = items.enabled;
        if (items.headers != null) {
            document.getElementById('name').value = items.headers[0].name;
            document.getElementById('value').value = items.headers[0].value;
        }
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
