/*
 * Ext JS Library 2.0
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */



/*
 * Use our blank image
 */
Ext.BLANK_IMAGE_URL = 'css/images/s.gif';



Ext.Desktop = function(app) {
    this.taskbar = new Ext.ux.TaskBar(app);
    var taskbar = this.taskbar;

    var desktopEl = Ext.get('x-desktop');
    var taskbarEl = Ext.get('ux-taskbar');
    var shortcuts = Ext.get('x-shortcuts');

    var windows = new Ext.WindowGroup();
    var activeWindow;

    function minimizeWin(win) {
        win.minimized = true;
        win.hide();
    }

    function markActive(win) {
        if (activeWindow && activeWindow != win) {
            markInactive(activeWindow);
        }
        taskbar.setActiveButton(win.taskButton);
        activeWindow = win;
        Ext.fly(win.taskButton.el).addClass('active-win');
        win.minimized = false;
    }

    function markInactive(win) {
        if (win == activeWindow) {
            activeWindow = null;
            Ext.fly(win.taskButton.el).removeClass('active-win');
        }
    }

    function removeWin(win) {
        taskbar.removeTaskButton(win.taskButton);
        layout();
    }

    function layout() {
        desktopEl.setHeight(Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight());
    }
    Ext.EventManager.onWindowResize(layout);

    this.layout = layout;

    this.createWindow = function(config, cls) {
        var win = new (cls || Ext.Window)(
                Ext.applyIf(config || {}, {
                    manager: windows,
                    minimizable: true,
                    maximizable: true
                })
                );
        win.render(desktopEl);
        win.taskButton = taskbar.addTaskButton(win);

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

        layout();
        return win;
    };

    this.getManager = function() {
        return windows;
    };

    this.getWindow = function(id) {
        return windows.get(id);
    }

    this.getWinWidth = function() {
        var width = Ext.lib.Dom.getViewWidth();
        return width < 200 ? 200 : width;
    }

    this.getWinHeight = function() {
        var height = (Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight());
        return height < 100 ? 100 : height;
    }

    this.getWinX = function(width) {
        return (Ext.lib.Dom.getViewWidth() - width) / 2
    }

    this.getWinY = function(height) {
        return (Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight() - height) / 2;
    }

    setTimeout(function() {
        Ext.get('loading').remove();
        Ext.get('loading-mask').fadeOut({remove:true});
    }, 250);

    this.setBackgroundColor = function(hex){
		if(hex){
			Ext.get(document.body).setStyle('background-color', '#' + hex);
			app.desktopConfig.backgroundcolor = hex;
		}
	}

    this.setTransparency = function(b){
		if(String(b) != ""){
			if(b){
				taskbarEl.addClass("transparency");
			}else{
				taskbarEl.removeClass("transparency");
			}
			app.desktopConfig.styles.transparency = b
		}
	}

	this.setWallpaper = function(imgName){
		Ext.MessageBox.show({
			msg: 'Loading wallpaper...',
			progressText: 'Loading...',
			width:300,
			wait:true,
			waitConfig: {interval:500}
		});

		var newImg = new Image();
		newImg.src = "wallpapers/" + imgName;

		var task = new Ext.util.DelayedTask(verifyImg);
		task.delay(200);

		function verifyImg(){
			if(newImg.complete){
				Ext.MessageBox.hide();
				task.cancel();
				window.document.body.background = "wallpapers/" + imgName;
			}else{
				task.delay(200);
			}
		}

		app.desktopConfig.wallpaper = imgName;
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

    desktopEl.on('contextmenu', function(e) {
        if (e.target.id == desktopEl.id) {
            e.stopEvent();
            if (!this.cmenu.el) {
                this.cmenu.render();
            }
            var xy = e.getXY();
            xy[1] -= this.cmenu.el.getHeight();
            this.cmenu.showAt(xy);
        }
    }, this);
};