# GNOME Shell Extension Setup and Testing

## Overview

This repository provides scripts to install and test the GNOME Shell extension `named-workspace@chaayakada.fun`. 

## Files

- `extension.js`: The main JavaScript file for the GNOME Shell extension.
- `manifest.json`: Metadata for the GNOME Shell extension.
- `install.sh`: Script to install the GNOME Shell extension.
- `nest-test.sh`: Script to launch GNOME Shell in a Wayland session where you can test the extension.

1. **Clone the Repository**

```sh
   git clone https://github.com/chimnayajith/named-workspace.git
   cd named-workspace
```
2. **Make the Installation script executable**
```sh
   chmod +x install.sh
```
3 . **Run the Installation Script**
```sh
    ./install.sh
```

This will copy the extension files to the GNOME Shell extensions directory. You can then enable the extension through GNOME Tweaks or the GNOME Shell Extensions website.


## Testing

1. **Make the test script executable**
```sh
chmod +x nest-test.sh
```

2. **Run the test script**
```sh
./nest-test.sh
```
This will launch GNOME Shell in a Wayland session where you can test the extension.


##Changing Workspace Names

To update workspace names, modify the `extension.js` file in this directory.
You can change line #43 to the workspace names that you prefer:
```js
this._workspaceNames = ['Personal', 'Work', 'Random', 'Workspace 4'];
```

Run the installation script again to apply changes.
