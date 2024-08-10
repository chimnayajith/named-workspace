import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import St from 'gi://St';
import GObject from 'gi://GObject';
import Clutter from 'gi://Clutter';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

const MyPanelButton = GObject.registerClass(
    class MyPanelButton extends PanelMenu.Button {
        _init() {
            super._init(0.0, 'MyPanelButton', false);

            this.box = new St.BoxLayout({
                style_class: 'panel-status-menu-box',
                vertical: false
            });

            this.label = new St.Label({
                text: '',
                y_align: Clutter.ActorAlign.CENTER,
                style: 'color: white; font-size: 14px;'
            });

            this.box.add_child(this.label);
            this.add_child(this.box);

            log('Label created');
        }

        setWorkspaceName(name) {
            this.label.set_text(name);
            log('Workspace name set to: ' + name);
        }
    }
);

export default class MyExtension extends Extension {
    enable() {
        this._panelButton = new MyPanelButton();
        Main.panel._leftBox.insert_child_at_index(this._panelButton.container, 1);
        log('Panel button added to the left box');

        this._workspaceNames = ['Personal', 'Work', 'Random', 'Workspace 4'];
        this._updateWorkspaceName();

        // Use a more robust method to connect to workspace change events
        this._workspaceChangedSignal = global.workspace_manager.connect(
            'active-workspace-changed',
            () => this._updateWorkspaceName()
        );
    }

    disable() {
        if (this._panelButton) {
            this._panelButton.destroy();
            this._panelButton = null;
            log('Panel button destroyed');
        }

        if (this._workspaceChangedSignal) {
            global.workspace_manager.disconnect(this._workspaceChangedSignal);
            this._workspaceChangedSignal = null;
        }
    }

    _updateWorkspaceName() {
        let workspaceManager = global.workspace_manager;
        let activeWorkspaceIndex = workspaceManager.get_active_workspace_index();

        if (activeWorkspaceIndex >= 0 && activeWorkspaceIndex < this._workspaceNames.length) {
            let workspaceName = this._workspaceNames[activeWorkspaceIndex];
            this._panelButton.setWorkspaceName(workspaceName);
        } else {
            this._panelButton.setWorkspaceName(Workspace ${activeWorkspaceIndex + 1});
        }
    }
}
