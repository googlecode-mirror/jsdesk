/*
 * Desktop configuration
 */
MyDesktop = new Ext.app.App({
	init :function(){
		Ext.QuickTips.init();
	},

	// get modules to initialize (make available to your desktop)
	getModules : function(){
		return [
			new MyDesktop.LayoutWindow(),
			new MyDesktop.Docs(),
			new MyDesktop.GridWindow(),
            new MyDesktop.TabWindow(),
            new MyDesktop.AccordionWindow(),
            new MyDesktop.subSubMenu(),
            new MyDesktop.subMenu(),
            new MyDesktop.BogusModule(),
            new MyDesktop.Preferences()
		];
	},
	
	// config for the start menu
    getStartConfig : function(){
    	var pref = new MyDesktop.Preferences();
		pref.app = this;
		
        return {
        	iconCls: 'user',
            title: get_cookie('memberName') || 'jsDesk',
            toolItems: [
            	pref.launcher
            ,{
				text:'Logout',
				iconCls:'logout',
				handler:function(){ window.location = "logout.php"; },
				scope:this
			}],
			toolPanelWidth: 115
        };
    },
    
    // get user preferences, modules to load into Start Menu and Quick Start
    getDesktopConfig : function(){
    	// can call server for saved module id's
		Ext.Ajax.request({
			success: function(o){
				var decoded = Ext.decode(o.responseText);
				
				if(decoded.success){
					this.initDesktopConfig(decoded.config);
				}else{
					// error
				}
			},
			failure: function(){
				// error
			},
			scope: this,
			url: 'source/core/DesktopConfig.php'
		});
		
		/* can hard code the module id's
		this.initDesktopConfig({
		  'autorun' : [
				'docs-win'
			],
			'desktopcontextmenu': [
				'preferences-win'
    		],
    		'quickstart': [
    			'grid-win',
				'tab-win',
				'acc-win',
				'layout-win'
			],
			'startmenu': [
				'docs-win',
				'grid-win',
				'tab-win',
				'acc-win',
				'layout-win',
				'bogus-menu'
			],
			'styles': {
				'backgroundcolor': 'f9f9f9',
				'theme': {
					'id': 'Vista',
					'path': 'resources/themes/xtheme-vista/css/xtheme-vista.css'
				},
				'transparency': false,
				'wallpaper': {
					'id': 'qWikiOffice',
					'path': 'resources/wallpapers/qwikioffice.jpg'
				},
				'wallpaperposition': 'center'
			}
		}); */
    }
});



/*
 * Example windows
 */
MyDesktop.GridWindow = Ext.extend(Ext.app.Module, {
	
	appType : 'grid',
    id : 'grid-win',
    
    init : function(){
        this.launcher = {
            text: 'Grid Window',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('grid-win');
        
        if(!win){
        
        	// example of getting a reference to another module's launcher object
        	var tabWinLauncher = MyDesktop.getModule('tab-win').launcher;
        	
        	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
        	
        	var grid = new Ext.grid.GridPanel({
				//autoExpandColumn:'company',
				border:false,
				ds: new Ext.data.Store({
					reader: new Ext.data.ArrayReader({}, [
						{name: 'company'},
						{name: 'price', type: 'float'},
						{name: 'change', type: 'float'},
						{name: 'pctChange', type: 'float'}
					]),
					data: Ext.grid.dummyData
				}),
				cm: new Ext.grid.ColumnModel([
					new Ext.grid.RowNumberer(),
					{header: "Company", width: 120, sortable: true, dataIndex: 'company'},
					{header: "Price", width: 70, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
					{header: "Change", width: 70, sortable: true, dataIndex: 'change'},
					{header: "% Change", width: 70, sortable: true, dataIndex: 'pctChange'}
				]),
				shadow: false,
				shadowOffset: 0,
				sm: sm,
				tbar: [{
					text:'Add Something',
					tooltip:'Add a new row',
					iconCls:'add'
				}, '-', {
					text:'Options',
					tooltip:'Blah blah blah blah',
					iconCls:'option'
				},'-',{
					text:'Remove Something',
					tooltip:'Remove the selected item',
					iconCls:'remove'
				},'-',{
					// example button to open another module
					text: 'Open Tab Window',
					handler: tabWinLauncher.handler,
					scope: tabWinLauncher.scope,
					iconCls: tabWinLauncher.iconCls
				}],
				viewConfig: {
					forceFit:true
				}
			});
			
			// example of how to open another module on rowselect
			sm.on('rowselect',function(){
				tabWinLauncher.handler.call(this.scope || this);
			}, this);
			
            win = desktop.createWindow({
                id: 'grid-win',
                title:'Grid Window',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
				layout: 'fit',
                items: grid
            });
        }
        win.show();
    }
});



MyDesktop.TabWindow = Ext.extend(Ext.app.Module, {
	
	appType : 'tabs',
    id : 'tab-win',
    
    init : function(){
        this.launcher = {
            text: 'Tab Window',
            iconCls:'tabs',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tab-win');
        if(!win){
            win = desktop.createWindow({
                id: 'tab-win',
                title:'Tab Window',
                width:740,
                height:480,
                iconCls: 'tabs',
                shim:false,
                animCollapse:false,
                constrainHeader:true,

                layout: 'fit',
                items:
                    new Ext.TabPanel({
                        activeTab:0,

                        items: [{
                        	autoScroll: true,
                            title: 'Tab Text 1',
                            header:false,
                            html : '<p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p>',
                			border:false
                        },{
                            title: 'Tab Text 2',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 3',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 4',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        }]
                    })
            });
        }
        win.show();
    }
});



MyDesktop.AccordionWindow = Ext.extend(Ext.app.Module, {
    
    appType : 'accordion',
    id : 'acc-win',
    
    init : function(){
        this.launcher = {
            text: 'Accordion Window',
            iconCls:'accordion',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('acc-win');
        if(!win){
            win = desktop.createWindow({
                id: 'acc-win',
                title: 'Accordion Window',
                width:250,
                height:400,
                iconCls: 'accordion',
                shim:false,
                animCollapse:false,
                constrainHeader:true,

                tbar:[{
                    tooltip:{title:'Rich Tooltips', text:'Let your users know what they can do!'},
                    iconCls:'connect'
                },'-',{
                    tooltip:'Add a new user',
                    iconCls:'user-add'
                },' ',{
                    tooltip:'Remove the selected user',
                    iconCls:'user-delete'
                }],

                layout:'accordion',
                layoutConfig: {
                    animate:false
                },

                items: [
                    new Ext.tree.TreePanel({
                        id:'im-tree',
                        title: 'Online Users',
                        loader: new Ext.tree.TreeLoader(),
                        rootVisible:false,
                        lines:false,
                        autoScroll:true,
                        tools:[{
                            id:'refresh',
                            on:{
                                click: function(){
                                    var tree = Ext.getCmp('im-tree');
                                    tree.body.mask('Loading', 'x-mask-loading');
                                    tree.root.reload();
                                    tree.root.collapse(true, false);
                                    setTimeout(function(){ // mimic a server call
                                        tree.body.unmask();
                                        tree.root.expand(true, true);
                                    }, 1000);
                                }
                            }
                        }],
                        root: new Ext.tree.AsyncTreeNode({
                            text:'Online',
                            children:[{
                                text:'Friends',
                                expanded:true,
                                children:[{
                                    text:'Jack',
                                    iconCls:'user',
                                    leaf:true
                                },{
                                    text:'Brian',
                                    iconCls:'user',
                                    leaf:true
                                },{
                                    text:'Jon',
                                    iconCls:'user',
                                    leaf:true
                                },{
                                    text:'Tim',
                                    iconCls:'user',
                                    leaf:true
                                },{
                                    text:'Nige',
                                    iconCls:'user',
                                    leaf:true
                                },{
                                    text:'Fred',
                                    iconCls:'user',
                                    leaf:true
                                },{
                                    text:'Bob',
                                    iconCls:'user',
                                    leaf:true
                                }]
                            },{
                                text:'Family',
                                expanded:true,
                                children:[{
                                    text:'Kelly',
                                    iconCls:'user-girl',
                                    leaf:true
                                },{
                                    text:'Sara',
                                    iconCls:'user-girl',
                                    leaf:true
                                },{
                                    text:'Zack',
                                    iconCls:'user-kid',
                                    leaf:true
                                },{
                                    text:'John',
                                    iconCls:'user-kid',
                                    leaf:true
                                }]
                            }]
                        })
                    }), {
                        title: 'Settings',
                        html:'<p>Something useful would be in here.</p>',
                        autoScroll:true
                    },{
                        title: 'Even More Stuff',
                        html : '<p>Something useful would be in here.</p>'
                    },{
                        title: 'My Stuff',
                        html : '<p>Something useful would be in here.</p>'
                    }
                ]
            });
        }
        win.show();
    }
});



MyDesktop.BogusModule = Ext.extend(Ext.app.Module, {

	appType : 'bogus',
	id : 'bogus-win',
	
	init : function(){
        this.launcher = {
            text: 'Bogus Window',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
    	var desktop = this.app.getDesktop();
        var win = desktop.getWindow('bogus-win');
        
        if(!win){
            win = desktop.createWindow({
                autoScroll: true,
                id: 'bogus-win',
                title: 'Bogus Window',
                width:640,
                height:480,
                html : '<p><b>This window is not maximizable!</b></p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p>',
                iconCls: 'bogus',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
                maximizable: false
            });
        }
        
        win.show();
    }
});



MyDesktop.subSubMenu = Ext.extend(Ext.app.Module, {

	appType : 'menu',
	id : 'bogus-submenu',
	
	menu : new Ext.menu.Menu(),

	/* Id's of modules to add to this menu,  can't hard code them in directly.
	 * Desktop needs to initialize them first. */
	items : [
		'bogus-win'
	],

	init : function(){
		this.launcher = {
			text: 'Bogus Sub-menu',
			iconCls: 'bogus',
			handler: function(){
				return false;
			},
			menu: this.menu
		}
	}
});



MyDesktop.subMenu = Ext.extend(Ext.app.Module, {

	appType : 'menu',
	id : 'bogus-menu',
	
	menu : new Ext.menu.Menu(),

	/* id's of modules to add to this menu,  can't hard code them in directly.
	 * desktop needs to initialize them first */
	items : [
		'bogus-submenu',
		'bogus-win'
	],

	init : function(){
		this.launcher = {
			text: 'Bogus Menu',
			iconCls: 'bogus',
			handler: function(){
				return false;
			},
			menu: this.menu


		}
	}
});



// Array data for the grid
Ext.grid.dummyData = [
    ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
    ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
    ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
    ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
    ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
    ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
    ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
    ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
    ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
    ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
    ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
    ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am'],
    ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am'],
    ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am'],
    ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am'],
    ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am'],
    ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am'],
    ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am'],
    ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am'],
    ['Walt Disney Company (The) (Holding Company)',29.89,0.24,0.81,'9/1 12:00am']
];
