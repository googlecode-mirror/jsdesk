Ext.SSL_SECURE_URL="css/images/s.gif"; 
Ext.BLANK_IMAGE_URL="css/images/s.gif";

Login = function(){
	var dialog, form;
	
	return{
		Init:function(){
		
			var logoPanel = new Ext.Panel({
				baseCls: 'x-plain',
				bodyStyle: 'background:#f9f9f9 url(wallpapers/qwikioffice.jpg) no-repeat center center;',
		        region: 'center'
			});
			
			var formPanel = new Ext.form.FormPanel({
		        baseCls: 'x-plain',
		        baseParams: {
		        	module: 'login'
		        },
		        bodyStyle: 'background:#f9f9f9 none; color:#222; padding:5px 35px;',
		        defaults: {
		        	width: 200
		        },
		        defaultType: 'textfield',
		        frame: false,
		        height: 70,
		        items: [{
		            fieldLabel: 'Email Address',
		            name: 'user',
		            value: 'demo'
		        },{
		            fieldLabel: 'Password',
		            inputType: 'password',
		            name: 'pass',
		            value: 'demo'
		        }],
		        labelWidth:120,
		        region: 'south',
		        url: 'php/login.php'
		    });
		
		   dialog = new Ext.Window({
		        buttons: [{
		        	handler: function(){
		        		form.submit({
							waitMsg:'Please Wait...',
							reset:true,
							success:Login.Success,
							scope:Login
						});
		        	},
		        	scope: Login,
		            text: 'Login'
		        }],
		        buttonAlign: 'right',
		        closable: false,
		        draggable: true,
		        height: 250,
		        id: 'login-win',
		        layout: 'border',
		        minHeight: 250,
		        minWidth: 530,
		        plain: false,
		        resizable: true,
		        items: [
		        	logoPanel,
		        	formPanel
		        ],
				title: 'Login',
		        width: 530
		    });
			
			form = formPanel.getForm();
			
		    dialog.show();
		},
		
		Success: function(f,a){
			if(a && a.result){
				dialog.destroy(true);
				// set the cookie
				set_cookie('key', a.result.key, '', '/desktop-demo/', '', '' );
				set_cookie('memberName', a.result.name, '', '/desktop-demo/', '', '' );
				set_cookie('memberType', a.result.type, '', '/desktop-demo/', '', '' );
				// redirect the window
				window.location = "/desktop-demo/";
			}
		}
	};
}();

Ext.BasicForm.prototype.afterAction=function(action, success){
	this.activeAction = null;
	var o = action.options;
	if(o.waitMsg){
		Ext.MessageBox.updateProgress(1);
		Ext.MessageBox.hide();
	}
	if(success){
		if(o.reset){
			this.reset();
		}
		Ext.callback(o.success, o.scope, [this, action]);
		this.fireEvent('actioncompleted', this, action);
	}else{
		Ext.callback(o.failure, o.scope, [this, action]);
		this.fireEvent('actionfailed', this, action);
	}
}

Ext.onReady(Login.Init, Login, true);