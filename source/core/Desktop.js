/*
 * Ext JS Library 2.0
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */



// Use our blank image
Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif';



Ext.Desktop = function(app){
	this.taskbar = new Ext.ux.TaskBar(app);
	var taskbar = this.taskbar;
	
	var desktopEl = Ext.get('x-desktop');
    var taskbarEl = Ext.get('ux-taskbar');
    var shortcuts = Ext.get('x-shortcuts');

    var windows = new Ext.WindowGroup();
    var activeWindow;
	
    //liuliming--fisheyetoolbar
    this.lmtaskbar = new Ext.ux.lmfisheyetoolbar(app);
    var lmtaskbar = this.lmtaskbar;
    //liuliming end
    
    function minimizeWin(win){
        win.minimized = true;
        win.hide();
    }

    function markActive(win){
        if(activeWindow && activeWindow != win){
            markInactive(activeWindow);
        }
        taskbar.setActiveButton(win.taskButton);
        activeWindow = win;
        Ext.fly(win.taskButton.el).addClass('active-win');
        win.minimized = false;
        
        //liuliming--fisheyetoolbar,if you want lmtoolbar add a task button dynamically, uncomment following lines
        //lmtaskbar.setActiveButton(win.lmtaskButton);
        //Ext.fly(win.lmtaskButton).addClass('active-win');
        //end of liuliming
    }

    function markInactive(win){
        if(win == activeWindow){
            activeWindow = null;
            Ext.fly(win.taskButton.el).removeClass('active-win');
        
             //liuliming--fisheyetoolbar,if you want lmtoolbar add a task button dynamically, uncomment following lines
            //Ext.fly(win.lmtaskButton).removeClass('active-win');
            //end of liuliming 
        }
    }

    function removeWin(win){
    	taskbar.removeTaskButton(win.taskButton);
    	
    	  //liuliming--fisheyetoolbar,if you want lmtoolbar add a task button dynamically, uncomment following lines
        //lmtaskbar.removeTaskButton(win.lmtaskButton);
        //end of liuliming
        
        layout();
    }

    function layout(){
        desktopEl.setHeight(Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight());
    }
    Ext.EventManager.onWindowResize(layout);

    this.layout = layout;

    this.createWindow = function(config, cls){
    	var win = new (cls||Ext.Window)(
            Ext.applyIf(config||{}, {
                manager: windows,
                minimizable: true,
                maximizable: true
            })
        );
        win.render(desktopEl);
        win.taskButton = taskbar.addTaskButton(win);

         //liuliming--fisheyetoolbar, if you want lmtoolbar add a task button dynamically, uncomment next line
        //win.lmtaskButton = lmtaskbar.addTaskButton(win);
        //end of liuliming
        
        win.cmenu = new Ext.menu.Menu({
            items: [

            ]
        });

        win.animateTarget = win.taskButton.el;
        
        win.on({
        	'activate': {
        		fn: markActive
        	},
        	'beforeshow': {
        		fn: markActive
        	},
        	'deactivate': {
        		fn: markInactive
        	},
        	'minimize': {
        		fn: minimizeWin
        	},
        	'close': {
        		fn: removeWin
        	}
        });
        
        //liuliming--fisheyetoolbar
        var top = this.lmtaskbar.barwindow.getSize().height * 2.2 ;
        win.setPosition(200, top);
        //end of liuliming
        
        layout();
        return win;
    };

    this.getManager = function(){
        return windows;
    };

    this.getWindow = function(id){
        return windows.get(id);
    }
    
    this.getWinWidth = function(){
		var width = Ext.lib.Dom.getViewWidth();
		return width < 200 ? 200 : width;
	}
		
	this.getWinHeight = function(){
		var height = (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight());
		return height < 100 ? 100 : height;
	}
		
	this.getWinX = function(width){
		return (Ext.lib.Dom.getViewWidth() - width) / 2
	}
		
	this.getWinY = function(height){
		return (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight() - height) / 2;
	}
	
    setTimeout(function() {
        Ext.get('loading').remove();
        Ext.get('loading-mask').fadeOut({remove:true});
    }, 250);

	this.setBackgroundColor = function(hex){
		if(hex){
			Ext.get(document.body).setStyle('background-color', '#' + hex);
			app.desktopConfig.styles.backgroundcolor = hex;
		}
	}
	
	this.setTheme = function(o){
		if(o && o.id && o.path){
			Ext.util.CSS.swapStyleSheet('theme', o.path);
			app.desktopConfig.styles.theme = o.id;
		}
	}
	
	this.setTransparency = function(b){
		if(String(b) != ""){
			if(b){
				taskbarEl.addClass("transparent");
			}else{
				taskbarEl.removeClass("transparent");
			}
			app.desktopConfig.styles.transparency = b
		}
	}
	
	this.setWallpaper = function(o){
		if(o && o.id && o.path){
			Ext.MessageBox.show({
				msg: 'Loading wallpaper...',
				progressText: 'Loading...',
				width:300,
				wait:true,
				waitConfig: {interval:500}
			});
			
			var wp = new Image();
			wp.src = o.path;
			
			var task = new Ext.util.DelayedTask(verify);
			task.delay(200);
			
			app.desktopConfig.styles.wallpaper = o.id;
		}
		
		function verify(){
			if(wp.complete){
				Ext.MessageBox.hide();
				task.cancel();
				window.document.body.background = wp.src;
			}else{
				task.delay(200);
			}
		}
	}
	
	this.setWallpaperPosition = function(pos){
		if(pos){
			if(pos === "center"){
				var b = Ext.get(document.body);
				b.removeClass('wallpaper-tile');
				b.addClass('wallpaper-center');
			}else if(pos === "tile"){
				var b = Ext.get(document.body);
				b.removeClass('wallpaper-center');
				b.addClass('wallpaper-tile');
			}			
			app.desktopConfig.styles.wallpaperposition = pos;
		}
	}

    layout();

    if(shortcuts){
       // added by iDevelopment - create movable desktop items
       var children = shortcuts.dom.childNodes;
       for (i = 0; i < children.length; i++){
           //if(isDefined(children[i].id)){
                          if(children[i].id){
               var shortcut = Ext.get(children[i].id);
               shortcut.initDD('DesktopShortcuts');
           }
       }
       // end added by iDevelopment

       // added by iDevelopment - changed from click to dblclick to prevent program starting while drag and dropping
       shortcuts.on('dblclick', function(e, t){
            if(t = e.getTarget('dt', shortcuts)){
                e.stopEvent();
                var module = app.getModule(t.id.replace('-shortcut', ''));
                if(module){
                    module.createWindow();
                }
            }
        });
    }
    
    this.cmenu = new Ext.menu.Menu();
    
    desktopEl.on('contextmenu', function(e){
    	if(e.target.id == desktopEl.id){
	    	e.stopEvent();
			if(!this.cmenu.el){
				this.cmenu.render();
			}
			var xy = e.getXY();
			xy[1] -= this.cmenu.el.getHeight();
			this.cmenu.showAt(xy);
		}
	}, this);
};
