Ext.namespace("Ext.ux");
/**
 * @class Ext.ux.lmfisheyetoolbar
 * @extends none
 * @author liuliming2008@126.com
 */

Ext.ux.lmfisheyetoolbar = function(app){
    this.app = app;

    //this.init();
    this.barwindow = new Ext.Window({
        title: '',
        closable:false,
        bodyBorder:false,
        border :false,
        hideBorders :true,
        baseCls:'x-lmtoolbar-window',
        footer :false,
        header :false,
        
        resizable: false,
        collapsible:true,
	    floating:true,
	    draggable:true,
        renderTo:Ext.get('lmtoolbar'),//Ext.get('toolbar2'),
        width:724,
        plain:true,
        height:66,
        //minimizable: true,
        html: '<ul id="ux-lmtaskbutton-strip"><ul>'//<li><a href="#1"><img src="./source/modules/lmtoolbar/images/history.png" alt="History"/><span>History</span></a></li><li><a href="#2"><img src="./source/modules/lmtoolbar/images/users.png" alt="Users"/><span>Users</span></a></li><li><a href="#3"><img src="./source/modules/lmtoolbar/images/graphs.png" alt="Graphs"/><span>Graphs</span></a></li><li><a href="#4"><img src="./source/modules/lmtoolbar/images/help.png" alt="Help"/><span>Help</span></a></li></ul>',

    });
    var barwindow = this.barwindow;
    this.startMenu = new Ext.menu.Menu(Ext.apply({//StartMenu
			//iconCls: 'user',
			//height: 300,
			shadow: true,
			title: 'Start lm', //get_cookie('memberName'),
			width: 300
		}));//, this.app.startConfig
	this.testmenu = new Ext.menu.Menu({
        id: 'mainMenu',
        items: [
            {
                text: 'I like Ext',
                checked: true,       // when checked has a boolean value, it is assumed to be a CheckItem
                //checkHandler: onItemCheck
                cls:'ux-lmtaskbutton',
                height:48,
                width:48
            },
            {
                text: 'Ext for jQuery',
                checked: true,
                 cls:'ux-lmtaskbutton'
                //checkHandler: onItemCheck
            },
            {
                text: 'I donated!',
                checked:false
                //checkHandler: onItemCheck
            }, '-', {
                text: 'Radio Options',
                menu: {        // <-- submenu by nested config object
                    items: [
                        // stick any markup in a menu
                        '<b class="menu-title">Choose a Theme</b>',
                        {
                            text: 'Aero Glass',
                            checked: true,
                            group: 'theme'
                            //checkHandler: onItemCheck
                        }, {
                            text: 'Vista Black',
                            checked: false,
                            group: 'theme'
                            //checkHandler: onItemCheck
                        }, {
                            text: 'Gray Theme',
                            checked: false,
                            group: 'theme'
                            //checkHandler: onItemCheck
                        }, {
                            text: 'Default Theme',
                            checked: false,
                            group: 'theme'
                            //checkHandler: onItemCheck
                        }
                    ]
                }
            }
        ]
    });	

    
    this.menuel = Ext.get("ux-lmtaskbutton-strip");
    this.items = [];
    //barwindow.setHeight(0);
    barwindow.setPosition(200,0);
    barwindow.show();
    this.fishmenues = null;
    
    //this.testmenu.onClick = function(){ log.debug("enable fish");this.barwindow.enableFisheye = true;};
	barwindow.enableFisheye = true;
    barwindow.buttonactions = 0;
 	
    this.barwinonmove = function (  el,  x,  y )
    {
    	if( barwindow.enableFisheye )
    		if( this.fishmenues )
    			this.fishmenues.refreshloc(x,y);
    }
    
    barwindow.on({
    'move' : this.barwinonmove,
     scope: this
	});
	
	this.addMenu = function(menu){
    	//this.tbPanel.ResizeElementsFisheye();
		this.barwindow.buttonactions++;
		
		var li = this.menuel.createChild({tag:'li'}, this.edge); // insert before the edge

        li.btn = new Ext.ux.lmfisheyetoolbar.menu(menu, li,this.barwindow);
		this.items.push(li);
		if(!this.fishmenues)
			this.fishmenues = new Ext.ux.Fisheye("ux-lmtaskbutton-strip",this.barwindow);
		//if(!this.buttonWidthSet){
		//	this.lastButtonWidth = btn.container.getWidth();
		//}
		else
			this.fishmenues.refreshitems();

		//this.setActiveButton(btn);
		return li;//btn;
		
	};
	this.addMenu(this.testmenu);
  
  this.addQsButton = function(mod){
    	//this.tbPanel.ResizeElementsFisheye();
		this.barwindow.buttonactions++;
		
		var li = this.menuel.createChild({tag:'li'}, this.edge); // insert before the edge

        li.btn = new Ext.ux.lmfisheyetoolbar.lmQsButton(mod, li,this.barwindow);
		this.items.push(li);
		if(!this.fishmenues)
			this.fishmenues = new Ext.ux.Fisheye("ux-lmtaskbutton-strip",this.barwindow);
		else
			this.fishmenues.refreshitems();

		//this.setActiveButton(btn);
		return li;//btn;
		
	} 
  this.removeQsButton = function(btn){
		btn.remove();
		
		var s = [];
		for(var i = 0, len = this.items.length; i < len; i++) {
			if(this.items[i] != btn){
				s.push(this.items[i]);
			}
		}
		this.items = s;
		
		this.fishmenues.refreshitems();
		//this.delegateUpdates();
	} 
	this.addTaskButton = function(win){
    	//this.tbPanel.ResizeElementsFisheye();
		this.barwindow.buttonactions++;
		
		var li = this.menuel.createChild({tag:'li'}, this.edge); // insert before the edge

        li.btn = new Ext.ux.lmfisheyetoolbar.lmTaskButton(win, li,this.barwindow);
		this.items.push(li);
		if(!this.fishmenues)
			this.fishmenues = new Ext.ux.Fisheye("ux-lmtaskbutton-strip",this.barwindow);
		else
			this.fishmenues.refreshitems();

		//this.setActiveButton(btn);
		return li;//btn;
		
	}
	this.removeTaskButton = function(btn){
		btn.remove();
		//this.menuel.remove()
		//li.parentNode.removeChild(li);*/
		
		/*var li = document.getElementById(btn.container.id);
		btn.destroy();
		li.parentNode.removeChild(li);*/
		
		var s = [];
		for(var i = 0, len = this.items.length; i < len; i++) {
			if(this.items[i] != btn){
				s.push(this.items[i]);
			}
		}
		this.items = s;
		
		this.fishmenues.refreshitems();
		//this.delegateUpdates();
	}
	this.setActiveButton = function(btn){
		//log.debug("setActiveButton");
		
	}
	
	this.initDesktopConfig = function(o){
    	if(!o){
			this.getDesktopConfig();
		}else{
			this.desktopConfig = o;
			//this.initAutoRun(o.autorun);
			//this.initDesktopContextMenu(o.desktopcontextmenu);
			this.initStartMenu(o.startmenu);
	        //this.initQuickStart(o.quickstart);
	        //this.initStyles(o.styles);
		}
    };
	// get user preferences, modules to load into Start Menu and Quick Start
    this.getDesktopConfig = function(){
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
};

	this.initStartMenu = function(mIds){
    	if(mIds){	        
	        for(var i = 0, iLen = mIds.length; i < iLen; i++){
				var m = this.app.getModule(mIds[i]);
	            if(m){
	            	var app = this.app;
	            	this.addItems(this.startMenu, m);
				}
	        }
		}
		
		/*function addItems(menu, m){ // recursive function, allows sub menus
			if(m.appType == 'menu'){
				var items = m.items;

				for(var j = 0, jLen = items.length; j < jLen; j++){
					var item = appHere.getModule(items[j]);
					if(item){
						
						addItems(m.menu, item);
					}
				}

			}
			if(m.launcher){
				log.debug("menu.add");
				menu.add(m.launcher);
			}		
		}*/
    };
    
    this.addItems = function(menu, m){ // recursive function, allows sub menus
    
      // add modules to the first button: menu
			//if(m.launcher){
      //  menu.add(m.launcher);
		
			if(m.appType == 'menu'){
				var items = m.items;
				for(var j = 0, jLen = items.length; j < jLen; j++){
					var item = this.app.getModule(items[j]);
					if(item){
						
						this.addItems(m.menu, item);
					}
				}
				return;
			}
      else
      {
        //if(m.launcher){
        this.addQsButton(m);
				//menu.add(m.launcher);
				//var item  =this.testmenu.add(m.launcher);
				//item.on('click', m.launcher);
				
			
      }
		}

}


	
	
Ext.ux.lmfisheyetoolbar.menu = function(menuinstance, el, cont){
	this.menuinstance = menuinstance;
	this.container = cont;
	this.el = el;

    //Ext.get(el).appendChild();
	
	
	var htmlinsert = '<img id="lmimg" src="'+'./source/modules/lmtoolbar/images/'+"graphs"+'.png" alt="test"/></img><span>'+"Menu"+"</span>";

    Ext.get(el).createChild({tag:'a',html:htmlinsert});
    //Ext.get(el).insertHtml("afterBegin",htmlinsert,true);

    
	this.init();
};

Ext.extend(Ext.ux.lmfisheyetoolbar.menu, Ext.Component, {
	
	init:function()
	{
		Ext.get(this.el).on({
			'click': this.onClick,
	        scope: this,
	        delay: 100
	    	
	    });
	},
	onClick:function()
	{
        //this.menuinstance.fireEvent("click");
		this.menuinstance.showAt([Ext.get(el).getLeft(),Ext.get(el).getBottom()]);//Ext.get(el).getXY());
		this.container.enableFisheye = false;
	}
});

Ext.ux.lmfisheyetoolbar.lmTaskButton = function(win, el, cont){
	this.win = win;
	this.container = cont;
	this.el = el;

    //Ext.get(el).appendChild();
	
	
	var htmlinsert = '<img id="lmimg" src="'+'./source/modules/lmtoolbar/images/'+win.id+'.png" alt="test"/></img><span>'+Ext.util.Format.ellipsis(win.title, 12)+"</span>";

    Ext.get(el).createChild({tag:'a',html:htmlinsert});
    //Ext.get(el).insertHtml("afterBegin",htmlinsert,true);

    
	this.init();
};

Ext.extend(Ext.ux.lmfisheyetoolbar.lmTaskButton, Ext.Component, {
	
	init:function()
	{
		Ext.get(this.el).on({
			'click': this.onClick,
	        scope: this,
	        delay: 100
	    	
	    });
	},
	onClick:function()
	{
	      //for task item
        if(this.win.minimized || this.win.hidden){
            this.win.show();
        }else if(this.win == this.win.manager.getActive()){
            this.win.minimize();
        }else{
            this.win.toFront();
        }
	}
});


Ext.ux.lmfisheyetoolbar.lmQsButton = function(mod, el, cont){
	this.mod = mod;
	this.container = cont;
	this.el = el;

    //Ext.get(el).appendChild();
	
	
	var htmlinsert = '<img id="lmimg" src="'+'./source/modules/lmtoolbar/images/'+mod.id+'.png" alt="test"/></img><span>'+Ext.util.Format.ellipsis(mod.id, 12)+"</span>";

    Ext.get(el).createChild({tag:'a',html:htmlinsert});
    //Ext.get(el).insertHtml("afterBegin",htmlinsert,true);

    
	this.init();
};

Ext.extend(Ext.ux.lmfisheyetoolbar.lmQsButton, Ext.Component, {
	
	init:function()
	{
		Ext.get(this.el).on({
			'click': this.onClick,
	        scope: this,
	        delay: 100
	    	
	    });
	},
	onClick:function()
	{
	       //for quick start
	       this.mod.createWindow();
	       //end of quick start
	      
	}
});
