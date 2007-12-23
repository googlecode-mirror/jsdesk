Ext.namespace("Ext.ux");
/**
 * @class Ext.ux.TaskBar
 * @extends Ext.util.Observable
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
        renderTo:Ext.get('toolbar2'),//Ext.get('toolbar2'),
        width:524,
        plain:true,
        height:64,
        
        html: '<ul id="ux-lmtaskbutton-strip"><ul>'//<li><a href="#1"><img src="./source/modules/lmtoolbar/images/history.png" alt="History"/><span>History</span></a></li><li><a href="#2"><img src="./source/modules/lmtoolbar/images/users.png" alt="Users"/><span>Users</span></a></li><li><a href="#3"><img src="./source/modules/lmtoolbar/images/graphs.png" alt="Graphs"/><span>Graphs</span></a></li><li><a href="#4"><img src="./source/modules/lmtoolbar/images/help.png" alt="Help"/><span>Help</span></a></li></ul>',

    });
    this.menuel = Ext.get("ux-lmtaskbutton-strip");
    this.items = [];
    this.barwindow.setPosition(300,0);
    this.barwindow.show();
    this.fishmenues = null;
    

    this.barwindow.buttonactions = 0;
 
    this.barwindow.onmove = function (  el,  x,  y )
    {
    	if( this.fishmenues )
    		this.fishmenues.refreshloc(x,y);
    }
    
    this.barwindow.on({
    'move' : this.barwindow.onmove,
     scope: this
	});
	
	this.addTaskButton = function(win){
    	//this.tbPanel.ResizeElementsFisheye();
		this.barwindow.buttonactions++;
		
		var li = this.menuel.createChild({tag:'li'}, this.edge); // insert before the edge

        li.btn = new Ext.ux.lmfisheyetoolbar.lmTaskButton(win, li,this.barwindow);
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
}

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
        if(this.win.minimized || this.win.hidden){
            this.win.show();
        }else if(this.win == this.win.manager.getActive()){
            this.win.minimize();
        }else{
            this.win.toFront();
        }
	}
});
