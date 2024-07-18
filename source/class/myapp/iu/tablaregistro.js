qx.Class.define("myapp.iu.tablaregistro", {
    extend: qx.ui.window.Window,
    
    construct: function (callTabla) {
        this.base(arguments);

        this.callTabla = callTabla;
        
        this.setShowMinimize(false);
        this.setShowMaximize(false);
        this.setShowClose(true);
        this.setCaption("Probando Tabla de Registro");
        this.addListenerOnce("resize", this.center, this);
        //this.setModal(false);
        this.setLayout(new qx.ui.layout.VBox(20));

        var modeloTabla = new qx.ui.table.model.Simple();
        this.modeloTabla = modeloTabla;

        modeloTabla.setColumns(
            [
                "ID",
                "USUARIO",
                "PASSWORD",
                "PASSCONFIRM",
                "MAIL",
                "ESTADO"
            ],
            [
                "ID",
                "USUARIO",
                "PASSWORD",
                "PASSCONFIRM",
                "MAIL",
                "ESTADO"
            ]);
        
        var tabla = new qx.ui.table.Table(this.modeloTabla);
        this.tabla = tabla;
        this.add(tabla);

        var datosJson = [
            {
                ID: 1,
                USUARIO: "paz",
                PASSWORD: "1234",
                PASSCONFIRM: "1234",
                MAIL: "pazalejandro@gmail.com",
                ESTADO: "ACTIVO"
            },
            {
                ID: 2,
                USUARIO: "bandan",
                PASSWORD: "12345",
                PASSCONFIRM: "12345",
                MAIL: "dhanbrandan@gmail.com",
                ESTADO: "pasivo"
            },
            {
                ID: 3,
                USUARIO: "papucho",
                PASSWORD: "123456",
                PASSCONFIRM: "123456",
                MAIL: "papucho@gmail.com",
                ESTADO: "pasivo"
            }
        ];

        modeloTabla.setDataAsMapArray(datosJson);

        var model = tabla.getTableModel();
        //console.log(model);

        /* //Probando Obtener un Valor de la tabla
        this.dataTabla = model.getRowData(0);
        var accesoUser = this.dataTabla[1];
        console.log(accesoUser); 
            //*va pero no va, si pero no...
        */

        //----------------------------------------------------------------------
        //probando encontrar usuario registrado 
        //! IMPORTANTE LOS DATOS EN MI TABLA SE ENCONTRABAN EN MI JSON.. PEDAZO DE ANIMAL QUE SOY.
        //! RECORDAR: SIEMPRE BUSCAR EL LUGAR DONDE SE ENCUENTRAN ALMACENADOS NUESTROS DATOS PARA
        //! PODER MANIPULARLOS MEDIANTE UNA VARIABLE. MAS CUANDO SE TRATA DE UNA EMULACION DE BD.

        //*YA PUEDO ACCEDER A LOS VALORES DE TABLA MEDIANTE FOR Y VER LOS REGISTROS DENTRO DE ELLA.
        // Obtengo los datos de la tabla mediante un fucking FOR

        /* var datosTabla = modeloTabla.getDataAsMapArray();

        for (var i = 0; i < datosTabla.length; i++) {
            var plsHDP = datosTabla[i].USUARIO;
            console.log("ID:", plsHDP.ID);
            console.log("USUARIO:", plsHDP);
            console.log("MAIL:", plsHDP.MAIL);
            console.log("ESTADO:", plsHDP.ESTADO);
        } */

        /* for (let i = 0; i < datosJson.length; i++) {
            let usuario = this.dataTabla[i];
            console.log('usuarios:', usuario);
            pal chori todoo... next....
        }
        */
        //----------------------------------------------------------------------

        var menu = new qx.ui.menu.Menu();

        //Creo 3 botones para el Menu
        var btnAdd = new qx.ui.menu.Button("Agregar");
        var btnMod = new qx.ui.menu.Button("Modificar");
        var btnDel = new qx.ui.menu.Button("Borrar");

        //AGREGO los botones al Menu
        menu.add(btnAdd);
        menu.add(btnMod);
        menu.add(btnDel);

        tabla.setContextMenu(menu);

        btnAdd.addListener("execute", function () {
            var winReg = new myapp.iu.registro(this);
            winReg.open();
        }, this);

        btnMod.addListener("execute", function () {
            
            if (confirm ("Esta seguro de modificar sus datos?") == true){
            var winReg = new myapp.iu.registro(this);
            
            var jSon = modeloTabla.getRowDataAsMap(tabla.getFocusedRow());
            winReg.setDatosReg(jSon);
            winReg.setCaption("Modificar");
            
                /* var valModificar = winReg.getDatosReg();
                modeloTabla.setRowsAsMapArray([valModificar], tabla.getFocusedRow());
                winReg.close(); */
            winReg.open();
            }
        }, this);

            //este codigo funciona para modificar la data del user, nito algo que active el codigo xDe
            /* var valModificar = winReg.getDatosReg();

            modeloTabla.setRowsAsMapArray([valModificar], tabla.getFocusedRow());

            winReg.close(); */

            //winReg.close();
            
            /* var modClave = prompt("Ingrese Nueva Pass");
            var rowTable = tabla.getFocusedRow();
            modeloTabla.setValueById("PASSWORD", rowTable, modClave ); */
            //var jSon = modeloTabla.getRowDataAsMap(tabla.getFocusedRow());
            //console.log(jSon);

        //}, this);

        btnDel.addListener("execute", function () {
            if (confirm ("Esta seguro que desea borrar?") == true){
                modeloTabla.removeRows(tabla.getFocusedRow(), 1);
            }
        }, this);

    },

members: {

        AddValoresTable : function (jSonData){
            this.modeloTabla.addRowsAsMapArray([jSonData]);
        },

        FuncionPrueba : function () {
            console.log("Funciona Esta Cosa");
        },

        datosLogBD : function (nomUserIng) {

            var datosTabla = this.modeloTabla.getDataAsMapArray();
            var usuarioRegistrado = null;
            var passwordRegistrada = null;
            var datosUsuarios = null;

            var usuario;
            var password;

            // Este codigo recorre todos los datos de la tabla y mediante un puntero
            // puedo acceder a los diferentes datos.
            for (var i = 0; i < datosTabla.length; i++) {
                var plsHDP = datosTabla[i];

                id = plsHDP.ID;
                usuario = plsHDP.USUARIO;
                password = plsHDP.PASSWORD;

                //console.log("ID", id);
                //console.log("USUARIO:", usuario);
                //console.log("PASSWORD:", password);

                //console.log("ID:", plsHDP.ID);
                //console.log("MAIL:", plsHDP.MAIL);
                //console.log("ESTADO:", plsHDP.ESTADO);
                //console.log(id, usuario, password);

                // Pregunta si el nombre del usuario ingresado mediante un parametro existe 
                // en el valor usuario ya registrado. "Autenticación"
                if (usuario === nomUserIng.Nombre && password == nomUserIng.Password) {
                    datosUsuarios = {usuario: usuario , password: password};
                    break; // Se encontró al usuario, salimos del bucle
                }
            }
            return datosUsuarios;
        },
        addValoresModTabla : function(valorAModificar){
            this.modeloTabla.setRowsAsMapArray([valorAModificar], this.tabla.getFocusedRow());
        },
        verificarUseReg : function(nomUserReg) {
            var datosTabla = this.modeloTabla.getDataAsMapArray();
            var usuarioRegistrado = false;
        
            for (var i = 0; i < datosTabla.length; i++) {
                var usuarioEnTabla = datosTabla[i].USUARIO;
                //console.log(usuarioEnTabla);
                //console.log(nomUserReg);
                if (usuarioEnTabla === nomUserReg) {
                    usuarioRegistrado = true;
                    console.log(usuarioRegistrado);
                    break; // Se encontró al usuario, salimos del bucle
                }
            }
            if (usuarioRegistrado) {
                console.log("Ya existe un usuario registrado con ese nombre. Por favor, elija otro nombre.");
            } else {
                console.log("El usuario puede continuar con el registro.");
            }
            return usuarioRegistrado;
        },
        verificarMailReg : function (mailUserReg) {
            var datosTabla = this.modeloTabla.getDataAsMapArray();
            var mailRegistrado = false;
        
            for (var i = 0; i < datosTabla.length; i++) {
                var mailEnTabla = datosTabla[i].MAIL;
                //console.log(usuarioEnTabla);
                //console.log(nomUserReg);
                if (mailEnTabla === mailUserReg) {
                    mailRegistrado = true;
                    console.log(mailRegistrado);
                    break; // Se encontró al usuario, salimos del bucle
                }
            }
            if (mailRegistrado) {
                console.log("Ya existe un mail registrado con ese nombre. Por favor, elija otro.");
            } else {
                console.log("El usuario puede continuar con el registro.");
            }
            return mailRegistrado;
        },
        checkPassMod : function (PassUserReg) {
            var datosTabla = this.modeloTabla.getDataAsMapArray();
            var passRegistrado = false;
        
            for (var i = 0; i < datosTabla.length; i++) {
                var passEnTabla = datosTabla[i].PASSWORD;
                
                if (passEnTabla === PassUserReg) {
                    passRegistrado = true;
                    console.log(passRegistrado);
                    break; // Se encontró al usuario, salimos del bucle
                }
            }
            if (passRegistrado) {
                console.log("Ingreso Correctamente la contraseña Actual puede seguir");
            } else {
                console.log("Ingrese su Contraseña Actual");
            }
            return passRegistrado;
        },
        nuevoID : function (){
            var datosTabla = this.modeloTabla.getDataAsMapArray();
            var ultimoID = 0;

            for (var i = 0; i < datosTabla.length; i++) {
                
                var IDEnTabla = datosTabla[i].ID;

                if (IDEnTabla > ultimoID){
                    ultimoID = IDEnTabla;
                }
            }
            console.log("Último ID asignado:", ultimoID);
            console.log("EL proximo ID sera;", ultimoID +1);
            return ultimoID;
        },
        respuestaTEST : function () { 
            alert("FUNCIONA");
        }
    }
});