qx.Class.define("myapp.iu.registro", {
    extend: qx.ui.window.Window,
    events : {
        "registrOK" : "qx.event.type.Event",
    },
    construct: function (callTabla, menu) { //Application 
        this.base(arguments, "registro");
        
        this.callTabla = callTabla;
        this.menu = menu;

        this.setWidth(300);
        this.setShowMinimize(false);
        this.setShowMaximize(false);
        this.setShowClose(false);
        this.setModal(true);
        this.setCaption("Registrate");
        this.addListenerOnce("resize", this.center, this);
        
        //alert("encontrando error");

        this.setLayout(new qx.ui.layout.VBox(10));

        this.contRegUser = new qx.ui.container.Composite();
        this.contRegUser.setLayout(new qx.ui.layout.VBox(10));
        this.contRegUser.setPadding(15);

        this.lbRegUser = new qx.ui.basic.Label("Usuario");
        this.txtRegUser = new qx.ui.form.TextField("");
        this.txtRegUser.setPlaceholder("Ingrese Un Usuario");
        //this.txtRegUser.setInvalidMessage("Usuario en Uso. Por favor, elija otro nombre.");

        //----------------------------------------
        this.eventoTxTReg();
        //----------------------------------------
        this.lbRegMail = new qx.ui.basic.Label("Mail");
        this.txtRegMail = new qx.ui.form.TextField("");
        this.txtRegMail.setPlaceholder("Ingrese Un Mail");

        //----------------------------------------
        this.mailEventReg();
        //----------------------------------------

        this.lblRegPassUser = new qx.ui.basic.Label("Contraseña");
        this.txtRegPassUser = new qx.ui.form.PasswordField("");
        this.txtRegPassUser.setPlaceholder("Ingrese Una Contraseña");

        this.lblRegPassConfirm = new qx.ui.basic.Label("Confirmar Contraseña");
        this.txtRegPassConfirm = new qx.ui.form.PasswordField("");
        this.txtRegPassConfirm.setPlaceholder("Confirme su Contraseña");
        
        this.btnRegUser = new qx.ui.form.Button("Registrar");
        
        //var callTabla = new myapp.iu.tablaregistro();

        this.btnRegUser.addListener("execute", function(){
            console.log(this.modo);
            if (this.modo == "ALTA") {

                var dataReg = this.getDatosReg();
                var USERTABLA = dataReg.USUARIO;
                var MAILTABLA = dataReg.MAIL;

                if (callTabla.verificarUseReg(USERTABLA) && callTabla.verificarMailReg(MAILTABLA)) {
                    alert("Cambiar nombre de usuario y correo electrónico");
                } else if (callTabla.verificarUseReg(USERTABLA)) {
                    alert("Cambiar nombre de usuario");
                } else if (callTabla.verificarMailReg(MAILTABLA)) {
                    alert("Cambiar correo electrónico");
                } else {
                    if (this.validarRegistro() == true){
                        callTabla.datosLogBD(dataReg);
                        callTabla.AddValoresTable(dataReg);
                        //callTabla.open();
                        //callTabla.FuncionPrueba();
                        //console.log(dataReg)
                        this.close();
                    }
                    this.fireEvent("registrOK");
                }
            } else {
                var dataRegMod = this.getDatosReg();
                callTabla.addValoresModTabla(dataRegMod);
                this.close();
            }
        }, this);

        // Agregamos el Obejtos al contenedor
        this.contRegUser.add(this.lbRegUser);
        this.contRegUser.add(this.txtRegUser);

        this.contRegUser.add(this.lbRegMail);
        this.contRegUser.add(this.txtRegMail);

        this.contRegUser.add(this.lblRegPassUser);
        this.contRegUser.add(this.txtRegPassUser);

        this.contRegUser.add(this.lblRegPassConfirm);
        this.contRegUser.add(this.txtRegPassConfirm);

        this.contRegUser.add(this.btnRegUser);

        this.add(this.contRegUser);

        //this.open();

    },

members: {
    modo: "ALTA",
    
    getDatosReg : function (){
        var verUltimoID = this.callTabla.nuevoID();
        //console.log(verUltimoID);
        
        var ID = verUltimoID +1; 
        var USUARIO = this.txtRegUser.getValue();
        var MAIL = this.txtRegMail.getValue();
        var PASSWORD = this.txtRegPassUser.getValue();
        var PASSCONFIRM = this.txtRegPassConfirm.getValue();
        //var ESTADO = this.obtenerEstadoAleatorio();
    
        var jSon = {}
    
        jSon.ID = ID;
        jSon.USUARIO = USUARIO;
        jSon.MAIL = MAIL;
        jSon.PASSWORD = PASSWORD;
        jSon.PASSCONFIRM = PASSCONFIRM;
        //jSon.ESTADO = ESTADO;
        //console.log(jSon);
        return jSon;

    },
    validarRegistro: function () {
        
        var USUARIO = this.txtRegUser.getValue().trim();
        var MAIL = this.txtRegMail.getValue().trim();
        var PASSWORD = this.txtRegPassUser.getValue().trim();
        var PASSCONFIRM = this.txtRegPassConfirm.getValue().trim();

        if (USUARIO === "" || MAIL === "" || PASSWORD === "" || PASSCONFIRM === "") {
            alert("Por favor, complete todos los campos del formulario.");
            return false;
        }
        if (PASSWORD !== PASSCONFIRM) {
            alert("La contraseña y la confirmación de contraseña no coinciden.");
            return false;
        }
        alert("Formulario de registro válido.");
        return true;
    },

    setDatosReg: function (jSonDatos) {
            this.txtRegUser.setValue(jSonDatos.USUARIO);
            this.txtRegMail.setValue(jSonDatos.MAIL);
            this.txtRegPassUser.setValue(jSonDatos.PASSWORD);
            this.txtRegPassConfirm .setValue(jSonDatos.PASSCONFIRM);
            this.modo = "MODIFICACION";
            this.btnRegUser.setLabel("Modificar");
    },
    getBtnRegUser: function() {
        return this.btnRegUser;
    },

    eventoTxTReg : function(){
        this.txtRegUser.addListener("changeValue", function(){
            
            var dataReg = this.getDatosReg();
                var USERTABLA = dataReg.USUARIO;
                var esInvalid = this.callTabla.verificarUseReg(USERTABLA);
                this.txtRegUser.setValid(!esInvalid);
                
                if (esInvalid) {
                    this.txtRegUser.setInvalidMessage("Usuario en uso. Por favor, Cambielo.");
                } else {
                    this.txtRegUser.setInvalidMessage("");
                }
        },this);
    },

    mailEventReg : function(){
        this.txtRegMail.addListener("changeValue", function(){
            var dataReg = this.getDatosReg();

                var MAILTABLA = dataReg.MAIL;
                var InvalidMail = this.callTabla.verificarMailReg(MAILTABLA);
                this.txtRegMail.setValid(!InvalidMail);

                if (InvalidMail) {
                    this.txtRegMail.setInvalidMessage("Mail en uso. Por favor, Cambielo.");
                } else {
                    this.txtRegMail.setInvalidMessage("");
                }
        },this);
    },
}
});