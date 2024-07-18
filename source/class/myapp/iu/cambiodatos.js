qx.Class.define("myapp.iu.cambiodatos", {
    extend: qx.ui.window.Window,
    events : {
        "changesOk" : "qx.event.type.Event",
    },
    construct: function (callTabla) { //Application 
        this.base(arguments);

        this.callTabla = callTabla;
        
        this.setWidth(300);
        this.setShowMinimize(false);
        this.setShowMaximize(false);
        this.setShowClose(false);
        this.setModal(true);
        this.setCaption("MODIFICAR DATOS");
        this.addListenerOnce("resize", this.center, this);

        this.setLayout(new qx.ui.layout.VBox(10));

        this.contModUser = new qx.ui.container.Composite();
        this.contModUser.setLayout(new qx.ui.layout.VBox(10));
        this.contModUser.setPadding(15);

        this.lblUserPass = new qx.ui.basic.Label("Ingrese Su Contraseña Actual");
        this.txtUserPass = new qx.ui.form.PasswordField("");
        this.txtUserPass.setPlaceholder("Ingrese su Contraseña");

        this.lblNewPass = new qx.ui.basic.Label("Nueva Contraseña");
        this.txtNewPass = new qx.ui.form.PasswordField("");
        this.txtNewPass.setPlaceholder("Nueva Contraseña");

        this.lblNewPassConfirm = new qx.ui.basic.Label("Confirmar Contraseña");
        this.txtNewPassConfirm = new qx.ui.form.PasswordField("");
        this.txtNewPassConfirm.setPlaceholder("Confirmar Contraseña");

        //----------------------------------------------------------------------

        this.PassChangEvent();

        //----------------------------------------------------------------------
        
        this.btnModata = new qx.ui.form.Button("Modificar");

        this.btnModata.addListener("execute", function(){

            /* var test = this.callTabla;
            test.respuestaTEST(); */

        }, this);


        this.btnRegSalir = new qx.ui.form.Button("Salir");
        
        this.btnRegSalir.addListener("execute", function(){
            
            this.close();

        },this);

        // Agregamos el Obejtos al contenedor
        this.contModUser.add(this.lblUserPass);
        this.contModUser.add(this.txtUserPass);

        this.contModUser.add(this.lblNewPass);
        this.contModUser.add(this.txtNewPass);

        this.contModUser.add(this.lblNewPassConfirm);
        this.contModUser.add(this.txtNewPassConfirm);

        this.contModUser.add(this.btnModata);
        this.contModUser.add(this.btnRegSalir);

        this.add(this.contModUser);

    },

members: {

    getDatosPass : function (){
        
        var PASSWORD = this.txtUserPass.getValue();
        var NEWPASSWORD = this.txtNewPass.getValue();
        var NEWPASSCONFIRM = this.txtNewPassConfirm.getValue();
    
        var jSon = {}

        jSon.PASSWORD = PASSWORD;
        jSon.NEWPASSWORD = NEWPASSWORD;
        jSon.NEWPASSCONFIRM = NEWPASSCONFIRM;

        return jSon;

    },
    validarPass: function () {
        
        var PASSWORD = this.txtUserPass.getValue().trim();
        var NEWPASSWORD = this.txtNewPass.getValue().trim();
        var NEWPASSCONFIRM = this.txtNewPassConfirm.getValue().trim();

        if (PASSWORD === "" || NEWPASSWORD === "" || NEWPASSCONFIRM === "") {
            alert("Por favor, complete todos los campos del formulario.");
            return false;
        }
        if (NEWPASSWORD !== NEWPASSCONFIRM) {
            alert("La contraseña y la confirmación de contraseña no coinciden.");
            return false;
        }
        alert("Los cambios se generaron con Exito");
        return true;
    },

    setDatospass: function (jSonDatos) {

            this.txtUserPass.setValue(jSonDatos.PASSWORD);
            this.txtNewPass.setValue(jSonDatos.NEWPASS);
            this.txtNewPassConfirm .setValue(jSonDatos.NEWPASSCONFIRM);

    },

    PassChangEvent : function(){
        this.txtUserPass.addListener("changeValue", function(){

            var dataReg = this.getDatosPass();

                var PassUserConfirm = dataReg.PASSWORD;


                console.log(PassUserConfirm);

                //var llamarDatosTabla = this.callTabla();

                //console.log(llamarDatosTabla);

                /* var InvalidPass = llamarDatosTabla.checkPassMod(PASSTABLA);
                this.txtUserPass.setValid(!InvalidPass);

                if (InvalidPass) {
                    this.txtUserPass.setInvalidMessage("Password Incorrecto. Por favor, Cambielo.");
                } else {
                    this.txtUserPass.setInvalidMessage("");
                } */
        },this);
    },
}
});