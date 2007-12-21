Ext.SSL_SECURE_URL="resources/images/default/s.gif"; 
Ext.BLANK_IMAGE_URL="resources/images/default/s.gif";

Ext.form.FormPanel.prototype.append = function() {
    // Create a new layout object
    var layout = new Ext.Panel();
  // Keep track of added fields that are form fields (isFormField)
    var fields = [];
  // Add all the fields on to the layout stack
    layout.add(arguments);

  // Add only those fields that are form fields to the 'fields' array
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i].isFormField) {
            fields.push(arguments[i]);
        }
    }

  // Render the layout
    layout.render(this.el);

  // If we found form fields add them to the form's items collection and render the
    // fields into their containers created by the layout
    if (fields.length > 0) {
        this.items.addAll(fields);

    // Render each field
        for (var i = 0; i < fields.length; i++) {
            fields[i].render('x-form-el-' + fields[i].id);
        }
    }

    return this;
};

Login = function() {
    var dialog, form;

    return{
        Init:function() {
            Ext.QuickTips.init();
            //            var logoPanel = new Ext.Panel({
            //                baseCls: 'x-plain',
            //                bodyStyle: 'background:#f9f9f9 url(wallpapers/qwikioffice.jpg) no-repeat center center;',
            //                region: 'center'
            //            });

            var loginPanel = new Ext.form.FormPanel({
                baseCls: 'x-plain',
                baseParams: {
                    module: 'login'
                },
            //                bodyStyle: 'background:#f9f9f9 none; color:#222; padding:5px 35px;',
                defaults: {
                    allowBlank: false
                },
                defaultType: 'textfield',
                frame: false,
                height: 50,
                width: 220,
                labelWidth:80,
                region: 'center',
                id: 'loginPanel',
                url: 'source/login/login.php',
                items: [{
                        fieldLabel: '<b>' + (Text.Lbl.UserName || 'User') + '</b>',
                        name: 'UserName',
                        tabIndex:1,
                        value:'demo',
                        anchor:'90%'
                    },{
                        inputType:'password',
                        fieldLabel: '<b>' + (Text.Lbl.Password || 'Pass') + '</b>',
                        name: 'Password',
                        tabIndex:2,
                        value: 'demo',
                        anchor:'90%'
                    }
                 ]
            });

            var registerPanel = new Ext.form.FormPanel({
                baseCls: 'x-plain',
                baseParams: {
                    module: 'register'
                },
                defaults: {
                    allowBlank: false
                },
                defaultType: 'textfield',
                frame: false,
                height: 100,
                width: 220,
                labelWidth:80,
                id: 'registerPanel',
                region: 'center',
                url: 'source/login/register.php',
                items: [{
                    fieldLabel: '<b>' + (Text.Lbl.UserName || 'User') + '</b>',
                    name: 'UserName',
                    tabIndex:1,
                    anchor:'90%'
                },{
                    inputType:'password',
                    fieldLabel: '<b>' + (Text.Lbl.Password || 'Pass') + '</b>',
                    name: 'Password',
                    id: 'Password',
                    tabIndex:2,
                    anchor:'90%'
                },{
                    inputType:'password',
                    fieldLabel: '<b>' + (Text.Lbl.Password || 'Password') + '</b>',
                    name: 'Password2',
                    vtype:'passwordConfirm',
                    tabIndex:3,
                    anchor:'90%'
                },{
                    fieldLabel: '<b>' + (Text.Lbl.Email || 'Email') + '</b>',
                    emptyText:Text.Lbl.EmptyEmail,
                    name: 'Email',
                    tabIndex:4,
                    vtype:'email',
                    anchor:'90%'
                },{
                    fieldLabel: '<b>' + (Text.Lbl.FirstName || 'First Name') + '</b>',
                    name: 'FirstName',
                    tabIndex:5,
                    anchor:'90%'
                },{
                    fieldLabel: '<b>' + (Text.Lbl.LastName || 'Last Name') + '</b>',
                    name: 'LastName',
                    tabIndex:6,
                    anchor:'90%'
                }
                        ]
            });

            var btnLogin = new Ext.Button({
                text: Text.Btn.Login,
                tooltip:Text.ToolTip.Login,
                type:'submit',
                handler: function() {
                    //                        var UserName = form.findField('UserName');
                    //                        var Password = form.findField('Password');
                    //                        var cryptpass = Ext.ux.Crypto.AES.encrypt(Password.getValue(), UserName.getValue(), 256); // encrypt using username as key
                    //                        Password.setValue(cryptpass);
                    form.submit({
                        waitTitle: "Please Wait...",
                        waitMsg: "Logging in...",
                        url: 'source/login/login.php',
                        method: 'POST',
                        success:Login.Success,
                        scope:Login
                    });
                }
            });
            var btnCreateAccount = new Ext.Button({
                text: Text.Btn.NoAccount,
                tooltip:Text.ToolTip.Register,
                handler: function() {
                    registerPanel.show();
                    loginPanel.hide();

                    var u = form.findField('UserName').getValue();
                    var p = form.findField('Password').getValue();
                    btnLogin.hide();
                    this.hide();
                    btnCancel.show();
                    btnRegister.show();

                    form = registerPanel.getForm();
                    form.findField('UserName').setValue(u);
                    form.findField('Password').setValue(p);

                    dialog.setHeight(240);
                    dialog.center();
                }
            });
            var btnRegister = new Ext.Button({
                text: Text.Btn.Register,
                tooltip:Text.ToolTip.Register,
                type:'submit',
                handler: function() {
                    //                        var UserName = form.findField('UserName');
                    //                        var Password = form.findField('Password');
                    //                        var cryptpass = Ext.ux.Crypto.AES.encrypt(Password.getValue(), UserName.getValue(), 256); // encrypt using username as key
                    //                        Password.setValue(cryptpass);
                    form.submit({
                        waitTitle: "Please Wait...",
                        waitMsg: "Validating Account...",
                        url: '/source/login/register.php',
                        method: 'POST',
                        success:Login.Success,
                        scope:Login
                    });
                }
            });
            var btnCancel = new Ext.Button({
                text: Text.Btn.Cancel || '',
                tooltip:Text.ToolTip.Cancel || '',
                handler: function() {
                    registerPanel.hide();
                    loginPanel.show();

                    btnRegister.hide();
                    this.hide();
                    btnLogin.show();
                    btnCreateAccount.show();

                    form = loginPanel.getForm();
                    dialog.setHeight(140);
                    dialog.center();
                }
            });
            dialog = new Ext.Window({
                buttons: [
                        btnLogin,
                        btnCreateAccount,
                        btnRegister,
                        btnCancel
                        ],
                buttonAlign: 'center',
                closable: false,
                draggable: true,
                width:320,
                height:140,
                id: 'login-win',
                layout: 'border',
                modal:true,
                plain:true,
                resizable: false,
                items: [
                        loginPanel,
                        registerPanel
                        ],
                title: Text.Lbl.LoginDialogTitle
            });

            form = loginPanel.getForm();

            btnCancel.hide();
            btnRegister.hide();
            registerPanel.hide();

            dialog.show(this);

            dialog.setZIndex('14000'); // move on top of desktop sheild
        },
        Success : function(f, a) {
            if (a && a.result) {
                dialog.destroy(true);
                Ext.getBody().down('.ext-el-mask').hide();
//                Ext.get('ext-gen15').hide(); // not sure why this mask from the waitMsg lingers :(
                // get the path
				var path = window.location.pathname,
					path = path.substring(0, path.lastIndexOf('/') + 1);
                // set the cookie
                set_cookie('key', a.result.key, '', path, '', '' );
				set_cookie('memberName', a.result.name, '', path, '', '' );
				set_cookie('memberType', a.result.type, '', path, '', '' );
                set_cookie('memberUsername', a.result.username, '', '/', '', '');
				// redirect the window
                window.location = path; // this is lame (we need to re-instantiate the app here to load all the user's stuff

            }
        },
        failure: function (f, a) {
            var errorList = '';
            for (var field in a.result.error) {
                var el = Ext.get(field);
                errorList += '<br />' + a.result.error[field];
                el.focus();
            }
            Ext.MessageBox.alert('Error', '' + errorList);
        }
    };
}();

Ext.BasicForm.prototype.afterAction = function(action, success) {
    this.activeAction = null;
    var o = action.options;
    if (o.waitMsg) {
        Ext.MessageBox.updateProgress(1);
        Ext.MessageBox.hide();
    }
    if (success) {
        if (o.reset) {
            this.reset();
        }
        Ext.callback(o.success, o.scope, [this, action]);
        this.fireEvent('actioncompleted', this, action);
    } else {
        Ext.callback(o.failure, o.scope, [this, action]);
        this.fireEvent('actionfailed', this, action);
    }
}

Ext.form.VTypes['passwordConfirmText'] = Text.Error.PasswordMatchFail;
Ext.form.VTypes['passwordConfirmMask'] = /.*/i; // allow all
Ext.form.VTypes['passwordConfirm'] = function(e) {
    return e == Ext.get('Password').getValue();
};

Ext.onReady(Login.Init, Login, true);