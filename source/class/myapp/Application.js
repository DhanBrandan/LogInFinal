/* ************************************************************************

   Copyright: 2024 undefined

   License: MIT license

   Authors: dhanbrandan

************************************************************************ */

/**
 * This is the main application class of "myapp"
 *
 * @asset(myapp/*)
 * #asset(myapp/*)
 */
qx.Class.define("myapp.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
  MEMBERS
  *****************************************************************************
  */
  members :
  {
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @lint ignoreDeprecated(alert)
     */
    main()
    {
      // Call super class
      super.main();

    // Enable logging in debug variant
    if (qx.core.Environment.get("qx.debug"))
    {
      // support native logging capabilities, e.g. Firebug for Firefox
      qx.log.appender.Native;
      // support additional cross-browser console. Press F7 to toggle visibility
      qx.log.appender.Console;
    }

    //Agrego funciones al Main Principal
    this.AppStart();

    },
    
    AppStart () {

      const doc = this.getRoot();

      const callTabla = new myapp.iu.tablaregistro();

      const btnTabla = new qx.ui.form.Button("Tabla");

      btnTabla.addListener("execute", function(){
        var claveTabla = prompt("Escribe la Clave para Acceder a la Tabla");
        if(claveTabla == "1234"){
          callTabla.open();
        }else{
          alert("Usted no tiene acceso a la Tabla");
        }
      },this);
      
      const menu = new myapp.iu.menu(callTabla);
        menu.addListener("logOUt", function(){
        alert("logOUT Ok");
        WinLog.cleanLogin();
        WinLog.open();
      },this);
      /* menu.addListener("dataUser", function(){ 
        alert("Ahora si funca");
      },this); */

      //const changeData = new myapp.iu.cambiodatos(callTabla);

      const WinLog = new myapp.iu.login(callTabla, menu); //Application
      WinLog.addListener("loginOk", function(datos){
        console.log(datos.getData());
      },this);
      
      WinLog.addListener("errorLogin", function(){
        alert("Error en Login");
      },this);

      /* WinLog.addListener("practicEvent", function(){
        console.log("Aqui Funciona Practicando");
        var callwinpra = new myapp.iu.winpractice();
        callwinpra.open();
        callwinpra.addListener("practicEvent", function(){
          alert("DE PIE HIJO DE PERRA..")
        },this);

        callwinpra.addListener("practicEvent2", function(){
          alert("PORQUE MICKEY TE AMA...")
        },this);

        callwinpra.addListener("practicEvent3", function(){
            callwinpra.close();
            WinLog.cleanLogin();
            WinLog.open();
        },this);
      },this); */

      doc.add(btnTabla, {right:0, top:0});
      doc.add(menu, {left:0, top:0});
      //doc.add(changeData);
    }
  }
});