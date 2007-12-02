MyDesktop.Preferences = Ext.extend(Ext.app.Module, {

    appType : 'preferences',
    id : 'preferences-win',

// Link/Button actions
    actions : null,
// Content panel
    cPanel : null,
// Current component loaded into the content panel
    cComp : null,

    init : function() {
        this.launcher = {
            menuText: 'Preferences',
            text: 'Preferences',
            iconCls: 'bogus',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function() {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('desktop-preferences');

        if (!win) {
            var winWidth = 650;
            var winHeight = 400;

            var west = new Ext.Panel({
                border: false,
                html: '<ul id="pref-nav-panel"> \
						<li> \
							<img src="css/images/s.gif" class="icon-pref-quickstart"/> \
							<a id="viewQuickstart" href="#">Quick Start</a> \
						</li> \
						<li> \
							<img src="css/images/s.gif" class="icon-pref-shortcuts"/> \
							<a id="viewShortcuts" href="#">Shortcuts</a> \
						</li> \
					</ul>',
                id: 'desktop-preferences-nav',
                region: 'west',
                split: false,
                width: 180
            });

            this.cPanel = new Ext.Panel({
                border: false,
                id: 'desktop-preferences-content',
                layout: 'fit',
                region: 'center'
            });

            win = desktop.createWindow({
                animCollapse: false,
                constrainHeader: true,
                id: 'desktop-preferences',
                height: winHeight,
                iconCls: 'bogus',
                items: [
                        west,
                        this.cPanel
                        ],
                layout: 'border',
                shim: false,
                title: 'Preferences',
                width: winWidth
            });

            this.initActions();
	        
	        // listeners
            var w = west.body;
            w.on('mousedown', this.doAction, this, {delegate:'a'});
            w.on('click', Ext.emptyFn, null, {delegate:'a', preventDefault:true});
            win.on('close', this.removeComp, this);
			
			// load component
            //this.viewQSTree();
        }

        win.show();
    },

    initActions : function() {
        this.actions = {
            'viewShortcuts' : function(app) {
                alert('Not active yet!');
            },

            'viewQuickstart' : function(app) {
                app.viewQSTree();
            }
        }
    },

    doAction : function(e, t) {
        e.stopEvent();
        this.actions[t.id](this);  // pass this app for scope
    },

    viewQSTree : function() {
        this.removeComp();

        this.cComp = QSTree.init(this.app);

        this.cPanel.add(this.cComp);
        this.cPanel.doLayout();

        this.cComp.root.expand(true);
    },

    removeComp : function() {
        if (this.cComp) {
            this.cPanel.remove(this.cComp);
            this.cComp = null;
        }
    }
});



// Quick Start Tree
QSTree = function() {
    var tree;

    /* function getCheckedIds(){
       var ids = [], c = 0;

       function simplifyNodes(node) {
           var kids = node.childNodes,
               len = kids.length;

           for (var i = 0; i < len; i++) {
               if(kids[i].leaf && kids[i].attributes.checked){
                   ids[++c-1] = kids[i].id;
               }
               simplifyNodes(kids[i]);
           }
       }

       simplifyNodes(this.cComp.root);
       return ids;
   } */

    function inQuickStart(id, qsIds) {
        for (var i = 0, len = qsIds.length; i < len; i++) {
            if (id == qsIds[i]) {
                return true;
            }
        }
    }

    function expandNodes(ms, qsIds) {
        var nodes = [];

        for (var i = 0, len = ms.length; i < len; i++) {
            var o = ms[i].launcher ? ms[i].launcher : ms[i];
            if (o.menu) {
                /* nodes.push({
                        leaf: false,
                        text: o.text || o.menuText,
                        children: this.expandNodes(o.menu.items, qsIds)
                    }); */
            } else {
                nodes.push({
                    checked: inQuickStart(ms[i].id, qsIds) ? true : false,
                    iconCls: 'quick-start-plugin',
                    id: ms[i].id,
                    leaf: true,
                    text: o.text || o.menuText
                });
            }
        }

        return nodes;
    }

    function onCheckChange(node, checked) {
        //console.log(node.ownerTree.id);
        var qs = this.app.desktopConfig.quickstart;

        if (node.leaf && node.id) {
            if (checked) {
                this.app.addQuickStartButton(node.id);
				
				// update desktopConfig
                qs.push(node.id);
            } else {
                this.app.removeQuickStartButton(node.id);
				
				// update desktopConfig
                var i = 0;
                while (i < qs.length) {
                    if (qs[i] == node.id) {
                        qs.splice(i, 1);
                    } else {
                        i++;
                    }
                }
            }
        }
    }

    function onSave() {
        var encIds = Ext.encode(this.app.desktopConfig.quickstart);
    	//console.log(encIds);

    	showProgress();

        Ext.Ajax.request({
            url: 'data/Preferences.php',
            params: {
                quickstart: encIds
            },
            success: function(o) {
                if (Ext.decode(o.responseText.success)) {

                } else {
					Ext.MessageBox.hide();
					Ext.MessageBox.alert('Error', 'Errors encountered on the server.');
                }
            },
            failure: function() {
				Ext.MessageBox.hide();
				Ext.MessageBox.alert('Error', 'Lost connection to server.');
            },
            scope: this
        });
    }

    function showProgress(){
    	Ext.MessageBox.show({
           msg: 'Saving your data, please wait...',
           progressText: 'Saving...',
           width:300,
           wait:true,
           waitConfig: {interval:200},
           icon:'desktop-download'
       });
	}

    return {
        app : null,

        init : function(app) {
            this.app = app;

            var ms = this.app.modules,
                    qsIds = this.app.desktopConfig.quickstart,
                    nodes = expandNodes(ms, qsIds);

            tree = new Ext.tree.TreePanel({
                autoScroll: true,
                bodyStyle: 'padding:10px',
                border: false,
                buttons: [{
                    handler: onSave,
                    scope: this,
                    text: 'Save'
                }],
                id: 'quickstart',
                lines: false,
                listeners: {
                    'checkchange': {
                        fn: onCheckChange,
                        scope: this
                    }
                },
                loader: new Ext.tree.TreeLoader(),
                rootVisible: true,
                root: new Ext.tree.AsyncTreeNode({
                    text: 'Quick Start Apps',
                    children: nodes
                })
            });

            return tree;
        }
    };
}();