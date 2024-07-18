qx.Class.define("myapp.iu.menu", {
    extend : qx.ui.container.Composite,
    events : {
        "logOUt" : "qx.event.type.Event",
        "dataUser" : "qx.event.type.Event",
        "practicEvent2" : "qx.event.type.Event",
        "practicEvent3" : "qx.event.type.Event",
    },
    construct: function (callTabla, WinLog) { //Application
        this.base(arguments);
        
        this.callTabla = callTabla;
        this.WinLog = WinLog;
                
        this.setLayout(new qx.ui.layout.HBox(100));
        
        this.MENU = new qx.ui.form.Button(" (_._) ");

        this.add(this.MENU);

        //---------------------------------------------------------
        
        this.cambiosUser();

        //---------------------------------------------------------

        this.loginUser();

    },
    
    members: {

            loginUser : function (NombreUser) {

                if(NombreUser){
                
                    this.MENU.setLabel(NombreUser);
                    this.btnClose = new qx.ui.form.Button("Salir");
                    this.add(this.btnClose);

                    this.btnClose.addListener("execute", function(){
                        this.btnClose.setVisibility("excluded");
                        this.MENU.setLabel("Iniciar");
                        this.fireEvent("logOUt");

                    },this);
                }
            },

            cambiosUser : function (NombreUser){
                
                if(NombreUser){
                    this.cambiarContraseña = new qx.ui.form.Button("Cambiar Contraseña");
                    this.add(this.cambiarContraseña);

                    this.cambiarContraseña.addListener("execute", function(){
                        this.cambiarContraseña.setVisibility("excluded");

                        var winChange = new myapp.iu.cambiodatos(this.callTabla);
                        winChange.open();

                    },this);
                }
            }
        }
    });
    