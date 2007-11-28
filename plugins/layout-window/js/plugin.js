/* *******************************************************************************
 * Use Plugin Namespace
 */
var Plugin = Plugin || {};



/*
 * Layout Window GUI
 * under the Plugin namespace
 */
Plugin.LayoutWindow = Ext.extend(Ext.app.Module, {
	id : 'layout-win',
	
	init : function(){
		this.launcher = {
			text: 'Layout Window',
			iconCls:'bogus',
			handler : this.createWindow,
			scope: this
		}
	},

	createWindow : function(){
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('layout-win');
		if(!win){
			var winWidth = desktop.getWinWidth() / 1.1;
			var winHeight = desktop.getWinHeight() / 1.1;
			
			win = desktop.createWindow({
				id: 'layout-win',
				title:'Layout Window',
				width:winWidth,
				height:winHeight,
				x:desktop.getWinX(winWidth),
				y:desktop.getWinY(winHeight),
				iconCls: 'bogus',
				shim:false,
				animCollapse:false,
				constrainHeader:true,
				minimizable:true,
    		maximizable:true,

				layout: 'border',
				tbar:[{
					text: 'Button1'
				},{
					text: 'Button2'
				}],
				items:[/*{
					region:'north',
					border:false,
					elements:'body',
					height:30
				},*/{
					region:'west',
					autoScroll:true,
					collapsible:true,
					cmargins:'0 0 0 0',
					margins:'0 0 0 0',
					split:true,
					title:'Panel',
					width:parseFloat(winWidth*0.3) < 201 ? parseFloat(winWidth*0.3) : 200
				},{
					region:'center',
					border:false,
					layout:'border',
					margins:'0 0 0 0',
					items:[{
						region:'north',
						elements:'body',
						title:'Panel',
						height:winHeight*0.3,
						split:true
					},{
						autoScroll:true,
						elements:'body',
						region:'center',
						id:'Details',
						title:'Preview Panel'
					}]
				}/*,{
					region:'south',
					border:false,
					elements:'body',
					height:25
				}*/]
			});
		}
		win.show();
	}
});