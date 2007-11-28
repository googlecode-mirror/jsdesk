LoginDialog = Ext.extend(Ext.app.Module, {
    init : function() {
        var loginForm = new Ext.form.FormPanel({
            labelWidth: 75, // label settings here cascade unless overridden
        //			url:'login.php',
            frame:true,
            defaultType: 'textfield',
        //autoHeight:true,
            bodyStyle:'padding:5px 5px 0',
            defaults: {// applied to each contained item
                allowBlank: false,
                selectOnFocus: true
            },
            width: 300,
            items: [{
                fieldLabel: '<b>' + Text.Lbl.UserName + '</b>',
                name: 'UserName',
                id: 'UserName',
                tabIndex:1,
                anchor:'90%'
            },{
                inputType:'password',
                fieldLabel: '<b>' + Text.Lbl.Password + '</b>',
                name: 'Password',
                id: 'Password',
                tabIndex:2,
                anchor:'90%'
            }],
            buttons: [{
                text: Text.Btn.Login,
                tooltip:Text.ToolTip.Login,
                type:'submit',
                handler: function() {
                    var form = loginForm.getForm();
//					var UserName = form.findField('UserName');
                    //					var Password = form.findField('Password');
                    //					var cryptpass = Ext.ux.Crypto.AES.encrypt(Password.getValue(), UserName.getValue(), 256); // encrypt using username as key
                    //					Password.setValue(cryptpass);
                    form.submit({
                        waitTitle: "Please Wait...",
                        waitMsg: "Logging in...",
                        url: 'login/',
                        method: 'POST',
                        success: function (f, a) {
                            if (a && a.result) {
                                win.destroy(true); // close dialog
                                Ext.get('ext-gen15').hide(); // not sure why this mask from the waitMsg lingers :(
                                // set the cookie
                                //								set_cookie('key', a.result.key, '', '/desktop-demo/', '', '' );
                                //								set_cookie('memberName', a.result.name, '', '/desktop-demo/', '', '' );
                                //								set_cookie('memberType', a.result.type, '', '/desktop-demo/', '', '' );
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
                    });
                }
            },{
                text: Text.Btn.NoAccount,
                tooltip:Text.ToolTip.Register,
                handler: function() {
                    this.handler = function() {
                        var form = loginForm.getForm();
						// check and trigger validation
                        //						var Email = form.findField('Email');

                        var UserName = form.findField('UserName');
                        var Password = form.findField('Password');
                        var Password2 = Ext.get('Password2');
                        var Email = Ext.get('Email');
                        var FullName = Ext.get('Email');
                        if (UserName.getValue() == '') {
                            Password.focus();
                            form.findField('UserName').focus(); // steal focus to activate validation
                            Password.focus();
                        } else if (Password.getValue() == '' || Password.getValue() != Password2.dom.value) {
                            Password2.focus();
                            form.findField('Password').focus();
                            Password2.focus();
                        } else if (Email.dom.value == Text.Lbl.EmptyEmail) {
                            Email.dom.value = '';
                            Email.focus();
                            form.findField('UserName').focus();
                            Email.focus();
                        } else if (FullName.dom.value == '') {
                            FullName.focus();
                            form.findField('UserName').focus();
                            FullName.focus();
                        } else {
                            //							var cryptpass = Ext.ux.Crypto.AES.encrypt(Password.getValue(), UserName.getValue(), 256); // encrypt using username as key
                            //							Password.setValue(cryptpass);
                            //							Password2.dom.value = cryptpass;
                            form.submit({
                                waitTitle: "Please Wait...",
                                waitMsg: "Validating Account...",
                                url: 'register/',
                                method: 'POST',
                                success: function (f, a) {
                                    if (a && a.result) { // has some return info
                                        win.destroy(true); // close dialog
                                        Ext.get('ext-gen15').hide(); // not sure why this mask from the waitMsg lingers :(
                                        // set the cookie
                                        //										set_cookie('key', a.result.key, '', '/desktop-demo/', '', '' );
                                        //										set_cookie('memberName', a.result.name, '', '/desktop-demo/', '', '' );
                                        //										set_cookie('memberType', a.result.type, '', '/desktop-demo/', '', '' );
                                        // redirect the window
                                        //										window.location = "/desktop-demo/";
                                        //Ext.MessageBox.alert('Thanks', 'Your account has been created and are now logged in 8^]');
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
                            });
                        }
                    }
                    loginForm.buttons[0].hide(); // hide login button
                    //					var x = Ext.get(this.id);
                    //					var y = x.down('.x-btn-text');
                    //					y.innerHTML = Text.Btn.Register;
                    this.el.dom.innerHTML = this.el.dom.innerHTML.replace(Text.Btn.NoAccount, Text.Btn.Register);
                    loginForm.add({
                        inputType:'password',
                        fieldLabel: '<b>' + Text.Lbl.Password + '</b>',
                        name: 'Password2',
                        id: 'Password2',
                        vtype:'passwordConfirm',
                        tabIndex:3,

                        anchor:'90%'
                    }, {
                        fieldLabel: '<b>' + Text.Lbl.Email + '</b>',
                        emptyText:Text.Lbl.EmptyEmail,
                        name: 'Email',
                        id: 'Email',
                        tabIndex:4,
                        vtype:'email',
                        anchor:'90%'
                    }, {
                        fieldLabel: '<b>' + Text.Lbl.FullName + '</b>',
                        name: 'FullName',
                        id: 'FullName',
                        tabIndex:5,
                        anchor:'90%'
                    //					},{ // course selector
                    ////						xtype:'textfield',
                    //						fieldLabel: '<b>'+Text.Lbl.Classes+'</b>',
                    //						name: 'Classes',
                    //						allowBlank:false,
                    //						tabIndex:6,
                    //						anchor:'90%'
                    });
                    win.setHeight(230);
                    win.center();
                }
            }]
        }); // end of form

        if (win == undefined) {
            var win = new Ext.Window({
                id: 'loginDialog',
                title: Text.Lbl.LoginDialogTitle,
                closable:false,//true,
                width:290,
                height:150,
                modal:true,
            //border:false,
                plain:true,
                layout: 'fit',
                items: [loginForm ]
            });
        }
        win.show(this);
        win.setZIndex('14000');
//		loginForm.getForm().findField('UserName').focus();
    },
    returnFailure : function (f, a) {
        var errorList = '';
        for (var field in a.result.error) {
            var el = Ext.get(field);
            errorList += '<br />' + a.result.error[field];
            el.focus();
        }
        Ext.MessageBox.alert('Error', '' + errorList);
    }
});

Ext.form.VTypes['passwordConfirmText'] = Text.Error.PasswordMatchFail;
Ext.form.VTypes['passwordConfirmMask'] = /.*/i; // allow all
Ext.form.VTypes['passwordConfirm'] = function(e) {
    return e == Ext.get('Password').getValue();
};

var Login = new LoginDialog();