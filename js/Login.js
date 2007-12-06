Ext.SSL_SECURE_URL = "css/images/s.gif";
Ext.BLANK_IMAGE_URL = "css/images/s.gif";

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

            //            var logoPanel = new Ext.Panel({
            //                baseCls: 'x-plain',
            //                bodyStyle: 'background:#f9f9f9 url(wallpapers/qwikioffice.jpg) no-repeat center center;',
            //                region: 'center'
            //            });

            var fUserName = new Ext.form.TextField({
                fieldLabel: '<b>' + (Text.Lbl.UserName || 'User') + '</b>',
                name: 'UserName',
                tabIndex:1,
                anchor:'90%'
            });
            var fPassword = new Ext.form.TextField({
                inputType:'password',
                fieldLabel: '<b>' + (Text.Lbl.Password || 'Pass') + '</b>',
                name: 'Password',
                tabIndex:2,
                anchor:'90%'
            });
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
                url: 'data/login.php',
                items: [{
                        fieldLabel: '<b>' + (Text.Lbl.UserName || 'User') + '</b>',
                        name: 'UserName',
                        tabIndex:1,
                        anchor:'90%'
                    },{
                        inputType:'password',
                        fieldLabel: '<b>' + (Text.Lbl.Password || 'Pass') + '</b>',
                        name: 'Password',
                        tabIndex:2,
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
                url: 'data/registration.php',
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
                        url: 'data/login.php',
                        method: 'POST',
                        success:Login.Success,
                        scope:Login
                    //                            success: function (f, a) {
                    //                                if (a && a.result) {
                    //                                    win.destroy(true); // close dialog
                    //                                    // set the cookie
                    //                                    set_cookie('key', a.result.key, 30, '/', '', '');
                    //                                    set_cookie('memberName', a.result.name, 30, '/', '', '');
                    //                                    set_cookie('memberType', a.result.type, 30, '/', '', '');
                    //                                    Ext.get('ext-gen15').hide(); // not sure why this mask from the waitMsg lingers :(
                    //                                }
                    //                            },
                    //                            failure: function (f, a) {
                    //                                var errorList = '';
                    //                                for (var field in a.result.error) {
                    //                                    var el = Ext.get(field);
                    //                                    errorList += '<br />' + a.result.error[field];
                    //                                    el.focus();
                    //                                }
                    //                                Ext.MessageBox.alert('Error', '' + errorList);
                    //                            }
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
                        url: 'data/register.php',
                        method: 'POST',
                        success:Login.Success,
                        scope:Login
                    });
//                    var UserName = form.findField('UserName');
                    //                    var Password = form.findField('Password');
                    //                    var Password2 = Ext.get('Password2');
                    //                    var Email = Ext.get('Email');
                    //                    var FirstName = Ext.get('FirstName');
                    //                    var LastName = Ext.get('LastName');
                    //                    if (UserName.getValue() == '') {
                    //                        Password.focus();
                    //                        form.findField('UserName').focus(); // steal focus to activate validation
                    //                        Password.focus();
                    //                    } else if (Password.getValue() == '' || Password.getValue() != Password2.dom.value) {
                    //                        Password2.focus();
                    //                        form.findField('Password').focus();
                    //                        Password2.focus();
                    //                    } else if (Email.dom.value == Text.Lbl.EmptyEmail) {
                    //                        Email.dom.value = '';
                    //                        Email.focus();
                    //                        form.findField('UserName').focus();
                    //                        Email.focus();
                    //                    } else if (FirstName.dom.value == '') {
                    //                        FirstName.focus();
                    //                        form.findField('UserName').focus();
                    //                        FirstName.focus();
                    //                    } else if (LastName.dom.value == '') {
                    //                        LastName.focus();
                    //                        form.findField('UserName').focus();
                    //                        LastName.focus();
                    //                    } else {
                    //							var cryptpass = Ext.ux.Crypto.AES.encrypt(Password.getValue(), UserName.getValue(), 256); // encrypt using username as key
                    //							Password.setValue(cryptpass);
                    //							Password2.dom.value = cryptpass;

                    //                                    success: function (f, a) {
                    //                                        if (a && a.result) { // has some return info
                    //                                            win.destroy(true); // close dialog
                    //                                            Ext.get('ext-gen15').hide(); // not sure why this mask from the waitMsg lingers :(
                    //                                            // set the cookie
                    //                                            set_cookie('key', a.result.key, 30, '/', '', '' );
                    //                                            set_cookie('memberName', a.result.name, 30, '/', '', '' );
                    //                                            set_cookie('memberType', a.result.type, 30, '/', '', '' );
                    //                                            // redirect the window
                    //                                            //										window.location = "/desktop-demo/";
                    //                                            //Ext.MessageBox.alert('Thanks', 'Your account has been created and are now logged in 8^]');
                    //                                        }
                    //                                    },
                    //                                    failure: function (f, a) {
                    //                                        var errorList = '';
                    //                                        for (var field in a.result.error) {
                    //                                            var el = Ext.get(field);
                    //                                            errorList += '<br />' + a.result.error[field];
                    //                                            el.focus();
                    //                                        }
                    //                                        Ext.MessageBox.alert('Error', '' + errorList);
                    //                                    }
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
                // set the cookie
                set_cookie('key', a.result.key, '', '/', '', '');
                set_cookie('memberUsername', a.result.username, '', '/', '', '');
                set_cookie('memberName', a.result.name, '', '/', '', '');
                set_cookie('memberType', a.result.type, '', '/', '', '');
				// redirect the window
                //window.location = "/";
            }
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