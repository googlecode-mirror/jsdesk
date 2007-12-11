MyDesktop.Preferences = Ext.extend(Ext.app.Module, {

	appType : 'preferences',
	id : 'preferences-win',

	actions : null,
	cards : [
		'pref-win-card-1', // navigation
		'pref-win-card-2', // quickstart
		'pref-win-card-3', // color and appearance
		'pref-win-card-4'  // wallpaper
	],
	contentPanel : null,
	cardHistory : [
		'pref-win-card-1' // default
	],
	layout: null,
	win : null,

    init : function(){
        this.launcher = {
        	menuText: 'Preferences',
            text: 'Preferences',
            iconCls: 'icon-pref',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
    	var desktop = this.app.getDesktop();
        this.win = desktop.getWindow('pref-win');

        if(!this.win){
        	var winWidth = 570;
			var winHeight = 440;

			var navigation = new Ext.Panel({
				border: false,
				html: '<ul id="pref-nav-panel"> \
						<li> \
							<img src="css/images/s.gif" class="icon-pref-quickstart"/> \
							<a id="viewQuickstart" href="#">Quick Start Apps</a><br /> \
							<span>Choose which applications appear in your Quick Start panel.</span> \
						</li> \
						<li> \
							<img src="css/images/s.gif" class="icon-pref-quickstart"/> \
							<a id="viewAppearance" href="#">Window Color and Appearance</a><br /> \
							<span>Fine tune window color and style of your windows.</span> \
						</li> \
						<li> \
							<img src="css/images/s.gif" class="icon-pref-wallpaper"/> \
							<a id="viewWallpapers" href="#">Wallpaper</a><br /> \
							<span>Choose from available wallpapers to decorate you desktop.</span> \
						</li> \
					</ul>',
				id: 'pref-win-card-1'
			});

			var quickstart = MyDesktop.Preferences.QuickStart.init(this);
			var appearance = MyDesktop.Preferences.Appearance.init(this);
			var wallpaper = MyDesktop.Preferences.Wallpaper.init(this);

			this.contentPanel = new Ext.Panel({
				activeItem: 0,
                border: false,
				id: 'pref-win-content',
				items: [
                	navigation,
                	quickstart,
                	appearance,
                	wallpaper
                ],
				layout: 'card',
				tbar: [{
					disabled: true,
                	handler: this.navHandler.createDelegate(this, [-1]),
                	id: 'back',
                	scope: this,
                	text: 'Back'
                },{
                	disabled: true,
                	handler: this.navHandler.createDelegate(this, [1]),
                	id: 'next',
                	scope: this,
                	text: 'Next'
                }]
			});

            this.win = desktop.createWindow({
            	animCollapse: false,
                constrainHeader: true,
                id: 'pref-win',
                height: winHeight,
                iconCls: 'icon-pref',
                items: this.contentPanel,
                layout: 'fit',
                shim: false,
                title: 'Preferences',
                width: winWidth
            });

			this.layout = this.contentPanel.getLayout();
            this.initActions();
	        
	        // listeners
			navigation.body.on({
				'mousedown': {
					fn: this.doAction,
					scope: this,
					delegate: 'a'
				},
				'click': {
					fn: Ext.emptyFn,
					scope: null,
					delegate: 'a',
					preventDefault: true
				}
			});
        }

        this.win.show();
    },

    doAction : function(e, t){
    	e.stopEvent();
    	this.actions[t.id](this);  // pass this app for scope
    },

    initActions : function(){
		this.actions = {
			'viewQuickstart' : function(app){
	    		app.viewCard('pref-win-card-2');
	    	},

	    	'viewAppearance' : function(app){
	    		app.viewCard('pref-win-card-3');
	    	},

	    	'viewWallpapers' : function(app){
	    		app.viewCard('pref-win-card-4');
	    	}
	    }
	},

	viewCard : function(card){
		this.layout.setActiveItem(card);
	    if(this.cardHistory.length > 1){
	    	this.cardHistory.pop();
	    }
	    this.cardHistory.push(card);
	    this.handleButtonState();
	},

    navHandler : function(index){
    	var cards = this.cardHistory,
    		activeId = this.layout.activeItem.id,
    		nextId;

    	for(var i = 0, len = cards.length; i < len; i++){
    		if(cards[i] === activeId){
    			nextId = cards[i+index];
    			break;
    		}
    	}

    	this.layout.setActiveItem(nextId);
    	this.handleButtonState();
    },

    handleButtonState : function(){
    	var cards = this.cardHistory, activeId = this.layout.activeItem.id,
    		items = this.contentPanel.getTopToolbar().items, back = items.get(0), next = items.get(1);

    	for(var i = 0, len = cards.length; i < len; i++){
    		if(cards[i] === activeId){
    			if(i <= 0){
    				back.disable();
    				next.enable();
    			}else if(i >= (len-1)){
    				back.enable();
    				next.disable();
    			}else{
    				back.enable();
    				next.enable();
    			}
    			break;
    		}
    	}
    }
});



MyDesktop.Preferences.QuickStart = function(){
	var tree;

	function inQuickStart(id, qsIds){
		for(var i = 0, len = qsIds.length; i < len; i++){
			if(id == qsIds[i]){
				return true;
			}
		}
	}

	function expandNodes(ms, qsIds){
		var nodes = [];

		for(var i = 0, len = ms.length; i < len; i++){
			var o = ms[i].launcher ? ms[i].launcher : ms[i];
			if(o.menu){
				/* nodes.push({
					leaf: false,
					text: o.text || o.menuText,
					children: this.expandNodes(o.menu.items, qsIds)
				}); */
			}else{
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

	function onCheckChange(node, checked){
    	var qs = this.app.desktopConfig.quickstart;

    	if(node.leaf && node.id){
    		if(checked){
				this.app.addQuickStartButton(node.id);
				
				// update desktopConfig
				qs.push(node.id);
    		}else{
				this.app.removeQuickStartButton(node.id);
				
				// update desktopConfig
				var i = 0;
				while(i < qs.length){
					if(qs[i] == node.id){
						qs.splice(i, 1);
					}else{
						i++;
					}
				}
    		}
    	}
    }

    function onClose(){
		this.owner.win.close();
	}

    function onSave(){
    	var encIds = Ext.encode(this.app.desktopConfig.quickstart);

    	showProgress();

    	Ext.Ajax.request({
			url: 'data/Preferences.php',
			params: {
				task: 'save',
				what: 'quickstart',
				data: encIds
			},
			success: function(o){
				if(Ext.decode(o.responseText).success){
					Ext.MessageBox.hide();
				}else{
					Ext.MessageBox.hide();
					Ext.MessageBox.alert('Error', 'Errors encountered on the server.');
				}
			},
			failure: function(){
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
		owner : null,

		init : function(owner){
			this.owner = owner;
			this.app = owner.app;

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
				},{
					handler: onClose,
					scope: this,
					text: 'Close'
				}],
				id: 'pref-win-card-2',
				lines: false,
				listeners: {
					'checkchange': {
						fn: onCheckChange,
						scope: this
					}
				},
				loader: new Ext.tree.TreeLoader(),
				rootVisible: false,
				root: new Ext.tree.AsyncTreeNode({
					text: 'Quick Start Apps',
					children: nodes
				}),
				title: 'Quick Start Apps'
			});

			return tree;
		}
	};
}();



MyDesktop.Preferences.Appearance = function(){

	var desktop,
		view;

	function onApply(){

	}

	function onClose(){
		this.owner.win.close();
	}

	function onSave(){
		showProgress();

    	Ext.Ajax.request({
			url: 'data/Preferences.php',
			params: {
				task: 'save',
				what: 'transparency',
				data: this.app.desktopConfig.styles.transparency
			},
			success: function(o){
				if(Ext.decode(o.responseText).success){
					Ext.MessageBox.hide();
				}else{
					Ext.MessageBox.hide();
					Ext.MessageBox.alert('Error', 'Errors encountered on the server.');
				}
			},
			failure: function(){
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

	function toggleTransparency(field, checked){
		desktop.setTransparency(checked);
	}

	return {
		app : null,
		owner : null,

		init : function(owner){
			this.owner = owner;
			this.app = owner.app;
			desktop = this.app.getDesktop();

			var checkBox = new Ext.form.Checkbox({
				fieldLabel: 'Enable Transparency',
				checked: this.app.desktopConfig.styles.transparency ? true : false
			});
			checkBox.on('check', toggleTransparency, this);

			var formPanel = new Ext.FormPanel({
				border: false,
				items: checkBox,
				labelWidth: 125
			});

			var panel = new Ext.Panel({
				autoScroll: true,
				bodyStyle: 'padding:10px',
				border: false,
				 buttons: [{
				 	handler: onSave,
				 	scope: this,
                	text: 'Save'
                },{
                	handler: onClose,
                	scope: this,
                	text: 'Close'
                }],
                id: 'pref-win-card-3',
                items: formPanel,
                title: 'Window Color And Appearance'
			});

			return panel;
		}
	};
}();



MyDesktop.Preferences.Wallpaper = function(){

	var desktop,
		view;

	function onApply(){
		var sel = view.getSelectedRecords(),
			imgName = sel[0].data.name;

		desktop.setWallpaper(imgName);
	}

	function onClose(){
		this.owner.win.close();
	}

	function onSave(){
		showProgress();

    	Ext.Ajax.request({
			url: 'data/Preferences.php',
			params: {
				task: 'save',
				what: 'wallpaper',
				data: this.app.desktopConfig.wallpaper
			},
			success: function(o){
				if(Ext.decode(o.responseText).success){
					Ext.MessageBox.hide();
				}else{
					Ext.MessageBox.hide();
					Ext.MessageBox.alert('Error', 'Errors encountered on the server.');
				}
			},
			failure: function(){
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
		owner : null,

		init : function(owner){
			this.owner = owner;
			this.app = owner.app;
			desktop = this.app.getDesktop();

			var store = new Ext.data.JsonStore({
				baseParams: {
					task: 'load',
					what: 'wallpapers'
				},
				url: 'data/Preferences.php',
				root: 'images',
				fields: ['name', 'url']
			});

			store.on('load', function(store, records){
				if(records){
					defaults.setTitle('Default Wallpapers (' + records.length + ')');
				}
			});

			store.load();

			var tpl = new Ext.XTemplate(
				'<tpl for=".">',
					'<div class="bkview-thumb-wrap" id="{name}">',
						'<div class="bkview-thumb"><img src="{url}" title="{name}"></div>',
					'<span>{shortName}</span></div>',
				'</tpl>',
				'<div class="x-clear"></div>'
			);

			view = new Ext.DataView({
				autoHeight:true,
				emptyText: 'No wallpapers to display',
				itemSelector:'div.bkview-thumb-wrap',
				loadingText: 'loading...',
				singleSelect: true,
				overClass:'x-view-over',
				prepareData: function(data){
					data.shortName = Ext.util.Format.ellipsis(data.name, 17);
					return data;
				},
				store: store,
				tpl: tpl
			});

			var defaults = new Ext.Panel({
				border: false,
				collapsible: true,
				id: 'BkView',
				items: view,
				title: 'Default Wallpapers',
				titleCollapse: true
			});

			var panel = new Ext.Panel({
				autoScroll: true,
				bodyStyle: 'padding:10px',
				border: false,
				 buttons: [{
				 	handler: onSave,
				 	scope: this,
                	text: 'Save'
                },{
                	handler: onApply,
                	scope: this,
                	text: 'Apply'
                },{
                	handler: onClose,
                	scope: this,
                	text: 'Close'
                }],
                id: 'pref-win-card-4',
				items: defaults,
				title: 'Wallpaper'
			});

			return panel;
		}
	};
}();