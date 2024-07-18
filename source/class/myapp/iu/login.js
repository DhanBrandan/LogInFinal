qx.Class.define("myapp.iu.login", {
    extend: qx.ui.window.Window,
    events : {
        "loginOk" : "qx.event.type.Event",
        "errorLogin" : "qx.event.type.Event",
        "practicEvent" : "qx.event.type.Event",
    },
    construct: function (callTabla, menu) { //Application 
        this.base(arguments);
        
        this.callTabla = callTabla;
        this.menu = menu;
        
        this.setWidth(300);
        this.setShowMinimize(false);
        this.setShowMaximize(false);
        this.setShowClose(false);
        this.setCaption("Bienvenido");
        this.addListenerOnce("resize", this.center, this);
        //this.setModal(true);
        this.setLayout(new qx.ui.layout.VBox(10));

        this.contLogIn = new qx.ui.container.Composite();
        this.contLogIn.setLayout(new qx.ui.layout.VBox(10));
        this.contLogIn.setPadding(15);

        this.lbLogUser = new qx.ui.basic.Label("Usuario");
        this.txtLogUser = new qx.ui.form.TextField("");
        this.txtLogUser.setPlaceholder("Ingrese Su Usuario");

        this.lblPassUser = new qx.ui.basic.Label("Contraseña");
        this.txtPassUser = new qx.ui.form.PasswordField("");
        this.txtPassUser.setPlaceholder("Ingrese Su Contraseña");
        
        this.lbloginLink = new qx.ui.basic.Label("No tienes cuenta? Registrate");
        this.lbLogInListener();
        

        this.btnLogInUser = new qx.ui.form.Button("LogIn");

        this.btnLogInUser.addListener("execute", function(){
            
            var itsok = this.checkUserPass();
            if(itsok){
                var nomUserIng = this.getDatosLog();

                var datUseReg = callTabla.datosLogBD(nomUserIng);
                if (datUseReg) {

                /* var pruebaJson = {
                    uno:1,
                    dos:"dos",
                    tres:true,
                    cuatro:[
                        1,5,8
                    ]
                }; */
                this.menu.loginUser(nomUserIng.Nombre);
                this.menu.cambiosUser(nomUserIng.Nombre);
                //this.fireDataEvent("loginOk",pruebaJson);
                this.close();
                
                //this.fireEvent("practicEvent");
                } else {
                    console.log("El usuario NO existe en la tabla de registros o Error en Contraseña");
                    this.fireEvent("errorLogin");
                }
            }
        }, this );

        // Agregamos el Obejtos al contenedor
        this.contLogIn.add(this.lbLogUser);
        this.contLogIn.add(this.txtLogUser);

        this.contLogIn.add(this.lblPassUser);
        this.contLogIn.add(this.txtPassUser);

        this.contLogIn.add(this.lbloginLink);
        this.contLogIn.add(this.btnLogInUser);

        this.add(this.contLogIn);

        this.open();

    },

    members: {
        getDatosLog : function (){  

            var Nombre = this.txtLogUser.getValue();
            var Password = this.txtPassUser.getValue();
            
            var jSon = {}
    
            jSon.Nombre = Nombre;
            jSon.Password = Password;

            console.log(jSon);
            return jSon;
        },

        checkUserPass : function (){
            var LogUsuario = this.txtLogUser.getValue().trim();
            var Logcontraseña = this.txtPassUser.getValue().trim();

            if (LogUsuario === "" && Logcontraseña === "") {
                alert("Debes ingresar tu Usuario y Contraseña.");
                return false;
            }

            if (LogUsuario === "") {
                alert("Debes ingresar tu Usuario.");
                return false;
            }

            if (Logcontraseña === "") {
                alert("Debes ingresar tu Contraseña.");
                return false;
            }
            return true;
        },

        lbLogInListener : function (){

            this.lbloginLink.addListener("mouseover", function () {
                this.setTextColor("blue");
                //alert("funciona pulsar");
            });
            this.lbloginLink.addListener("mouseout", function () {
                this.setTextColor("black");
                //alert("funciona salir")
            });
            this.lbloginLink.addListener("click", function (){
                
                const WinReg = new myapp.iu.registro(this.callTabla);
                //this.close();
                WinReg.open();
                
            },this)
        },
        probando : function() {
            alert("funciona");
        },
        cleanLogin : function(){
            
                this.txtLogUser.setValue("");
                this.txtPassUser.setValue("");

        }
    }
});