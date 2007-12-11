/**
 * @class Ext.ux.StartMenu
 * @extends Ext.menu.Menu
 * A start menu object.
 * @constructor
 * Creates a new StartMenu
 * @param {Object} config Configuration options
 *
 * SAMPLE USAGE:
 *
 * this.startMenu = new Ext.ux.StartMenu({
 *		iconCls: 'user',
 *		height: 300,
 *		shadow: true,
 *		title: get_cookie('memberName'),
 *		toolPanelWidth: 110,
 *		width: 300
 *	});
 *
 * this.startMenu.add({
 *		text: 'Grid Window',
 *		iconCls:'icon-grid',
 *		handler : this.createWindow,
 *		scope: this
 *	});
 *
 * this.startMenu.addTool({
 *		text:'Logout',
 *		iconCls:'logout',
 *		handler:function(){ window.location = "logout.php"; },
 *		scope:this
 *	});
 */

Ext.namespace("Ext.ux");

Ext.ux.StartMenu = function(config){
	Ext.ux.StartMenu.superclass.constructor.call(this, config);
    
    var tools = this.toolItems;
    this.toolItems = new Ext.util.MixedCollection();
    if(tools){
        this.addTool.apply(this, tools);
    }
};

Ext.extend(Ext.ux.StartMenu, Ext.menu.Menu, {
	height : 300,
	toolPanelWidth : 100,
	width : 300,

    // private
    render : function(){
        if(this.el){
            return;
        }
        var el = this.el = new Ext.Layer({
            cls: "x-menu ux-start-menu", // this might affect item click
            shadow:this.shadow,
            constrain: false,
            parentEl: this.parentEl || document.body,
            zindex:15000
        });
        
        var header = el.createChild({
        	tag: "div",
        	cls: "x-window-header x-unselectable x-panel-icon "+this.iconCls
        });
		this.header = header;
		var headerText = header.createChild({
			tag: "span",
			cls: "x-window-header-text"
		});
		var tl = header.wrap({
			cls: "ux-start-menu-tl"
		});
		var tr = header.wrap({
			cls: "ux-start-menu-tr"
		});
		var tc = header.wrap({
			cls: "ux-start-menu-tc"
		});
		
		this.menuBWrap = el.createChild({
			tag: "div",
			cls: "ux-start-menu-body x-border-layout-ct ux-start-menu-body"
		});
		var ml = this.menuBWrap.wrap({
			cls: "ux-start-menu-ml"
		});
		var mc = this.menuBWrap.wrap({
			cls: "ux-start-menu-mc ux-start-menu-bwrap"
		});
		
		this.menuPanel = this.menuBWrap.createChild({
			tag: "div",
			cls: "x-panel x-border-panel ux-start-menu-apps-panel"
		});
		this.toolsPanel = this.menuBWrap.createChild({
			tag: "div",
			cls: "x-panel x-border-panel ux-start-menu-tools-panel"
		});
		
		var bwrap = ml.wrap({cls: "x-window-bwrap"});
		var bc = bwrap.createChild({
			tag: "div",
			cls: "ux-start-menu-bc"
		});
		var bl = bc.wrap({
			cls: "ux-start-menu-bl x-panel-nofooter"
		});
		var br = bc.wrap({
			cls: "ux-start-menu-br"
		});
		
        this.keyNav = new Ext.menu.MenuNav(this);

        if(this.plain){
            el.addClass("x-menu-plain");
        }
        if(this.cls){
            el.addClass(this.cls);
        }
        // generic focus element
        this.focusEl = el.createChild({
            tag: "a",
            cls: "x-menu-focus",
            href: "#",
            onclick: "return false;",
            tabIndex:"-1"
        });
        
        var ul = this.menuPanel.createChild({
        	tag: "ul",
        	cls: "x-menu-list"});
        var toolsUl = this.toolsPanel.createChild({
        	tag: "ul",
        	cls: "x-menu-list"
        });
        
        var ulListeners = {
        	"click": {
        		fn: this.onClick,
        		scope: this
        	},
        	"mouseover": {
        		fn: this.onMouseOver,
        		scope: this
        	},
        	"mouseout": {
        		fn: this.onMouseOut,
        		scope: this
        	}
        };
        
        ul.on(ulListeners);
        
        this.items.each(
        	function(item){
	            var li = document.createElement("li");
	            li.className = "x-menu-list-item";
	            ul.dom.appendChild(li);
	            item.render(li, this);
	        }, this);

        this.ul = ul;
        this.autoWidth();

        toolsUl.on(ulListeners);
        
        this.toolItems.each(
        	function(item){
	            var li = document.createElement("li");
	            li.className = "x-menu-list-item";
	            toolsUl.dom.appendChild(li);
	            item.render(li, this);
	        }, this);
	        
        this.toolsUl = toolsUl;
        this.autoWidth();
             
        this.menuBWrap.setStyle('position', 'relative');  
        this.menuBWrap.setHeight(this.height);
        
        this.menuPanel.setStyle({
        	padding: '2px',
        	position: 'absolute',
        	overflow: 'auto'
        });
        
        this.toolsPanel.setStyle({
        	padding: '2px 4px 2px 2px',
        	position: 'absolute',
        	overflow: 'auto'
        });
        
        this.setTitle(this.title);
    },
    
    // private
    findTargetItem : function(e){
        var t = e.getTarget(".x-menu-list-item", this.ul,  true);
        if(t && t.menuItemId){
        	if(this.items.get(t.menuItemId)){
            	return this.items.get(t.menuItemId);
            }else{
            	return this.toolItems.get(t.menuItemId);
            }
        }
    },

    /**
     * Displays this menu relative to another element
     * @param {Mixed} element The element to align to
     * @param {String} position (optional) The {@link Ext.Element#alignTo} anchor position to use in aligning to
     * the element (defaults to this.defaultAlign)
     * @param {Ext.ux.StartMenu} parentMenu (optional) This menu's parent menu, if applicable (defaults to undefined)
     */
    show : function(el, pos, parentMenu){
        this.parentMenu = parentMenu;
        if(!this.el){
            this.render();
        }

        this.fireEvent("beforeshow", this);
        this.showAt(this.el.getAlignToXY(el, pos || this.defaultAlign), parentMenu, false);
        
        var tPanelWidth = this.toolPanelWidth;
        var box = this.menuBWrap.getBox();
        this.menuPanel.setWidth(box.width-tPanelWidth);
        this.menuPanel.setHeight(box.height);
        
        this.toolsPanel.setWidth(tPanelWidth);
        this.toolsPanel.setX(box.x+box.width-tPanelWidth);
        this.toolsPanel.setHeight(box.height);
    },
    
    addTool : function(){
        var a = arguments, l = a.length, item;
        for(var i = 0; i < l; i++){
            var el = a[i];
            if(el.render){ // some kind of Item
                item = this.addToolItem(el);
            }else if(typeof el == "string"){ // string
                if(el == "separator" || el == "-"){
                    item = this.addToolSeparator();
                }else{
                    item = this.addText(el);
                }
            }else if(el.tagName || el.el){ // element
                item = this.addElement(el);
            }else if(typeof el == "object"){ // must be menu item config?
                item = this.addToolMenuItem(el);
            }
        }
        return item;
    },
    
    /**
     * Adds a separator bar to the Tools
     * @return {Ext.menu.Item} The menu item that was added
     */
    addToolSeparator : function(){
        return this.addToolItem(new Ext.menu.Separator({itemCls: 'ux-toolmenu-sep'}));
    },

    addToolItem : function(item){
        this.toolItems.add(item);
        if(this.toolsUl){
            var li = document.createElement("li");
            li.className = "x-menu-list-item";
            this.toolsUl.dom.appendChild(li);
            item.render(li, this);
            this.delayAutoWidth();
        }
        return item;
    }, 

    addToolMenuItem : function(config){
        if(!(config instanceof Ext.menu.Item)){
            if(typeof config.checked == "boolean"){ // must be check menu item config?
                config = new Ext.menu.CheckItem(config);
            }else{
                //config = new Ext.menu.Item(config);
                config = new Ext.ux.StartMenuTool(config);
            }
        }
        return this.addToolItem(config);
    },

    addModule: function(m){
        var ms = this.modules;
        m.menuItem = this.startMenu.add(m.launcher);
        m.app = this
        ms[ms.length]=m;
    },

    removeModule: function(name){
        var m = this.getModule(name)
        if (m && m.menuItem) {
            this.startMenu.remove(m.menuItem);
        }

    },
    
    setTitle : function(title, iconCls){
        this.title = title;
        this.header.child('span').update(title);
        return this;
    }
});



/**
 * @class Ext.ux.StartMenuTool
 * @extends Ext.menu.Item
 * A class for all start menu tool items.  Item extends the functionality of {@link Ext.menu.Item}
 * by adding Vista like tool button.
 * @constructor
 * Creates a new StartMenuTool
 * @param {Object} config Configuration options
 */

Ext.ux.StartMenuTool = function(config){
    Ext.ux.StartMenuTool.superclass.constructor.call(this, config);
    if(this.menu){
        this.menu = Ext.menu.MenuMgr.get(this.menu);
    }
};
Ext.extend(Ext.ux.StartMenuTool, Ext.menu.Item, {
	/**
     * @cfg {String} itemCls The default CSS class to use for menu items (defaults to 'x-startmenu-tool')
     */
    itemCls : "x-startmenu-tool",

	// private
    onRender : function(container, position){
        var el = document.createElement("div");
        el.hideFocus = true;
        el.className = this.itemCls + (this.menu ?  " x-startmenu-tool-arrow" : "") + (this.cls ?  " " + this.cls : "");
        el.innerHTML = String.format(
                '<table border="0" cellpadding="0" cellspacing="0" class="ux-startmenu-tool x-btn-wrap x-btn"><tbody><tr><td class="ux-startmenu-tool-left"><i>&#160;</i></td><td class="ux-startmenu-tool-center"><em unselectable="on"><button class="x-btn-text" type="{2}" style="height:27px;">{1}</button></em></td><td class="ux-startmenu-tool-right"><i>&#160;</i></td></tr></tbody></table>',
                this.icon || Ext.BLANK_IMAGE_URL, this.text, this.iconCls || '');
        this.el = el;
        Ext.menu.Item.superclass.onRender.call(this, container, position);
    },

    /**
     * Sets the text to display in this menu item
     * @param {String} text The text to display
     */
    setText : function(text){
        this.text = text;
        if(this.rendered){
            this.el.update(String.format(
                '<img src="{0}" class="x-startmenu-tool-icon {2}">{1}',
                this.icon || Ext.BLANK_IMAGE_URL, this.text, this.iconCls || ''));
            this.parentMenu.autoWidth();
        }
    },

    /**
     * Sets the CSS class to apply to the item's icon element
     * @param {String} cls The CSS class to apply
     */
    setIconClass : function(cls){
        var oldCls = this.iconCls;
        this.iconCls = cls;
        if(this.rendered){
            this.el.child('img.x-startmenu-tool-icon').replaceClass(oldCls, this.iconCls);
        }
    }
});