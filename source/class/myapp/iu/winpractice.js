qx.Class.define("myapp.iu.winpractice", {
    extend: qx.ui.window.Window,
    events : {
        "practicEvent" : "qx.event.type.Event",
        "practicEvent2" : "qx.event.type.Event",
        "practicEvent3" : "qx.event.type.Event",
    },
    construct: function () { //Application 
        this.base(arguments);

        
        
        this.setShowMinimize(false);
        this.setShowMaximize(false);
        this.setShowClose(false);
        this.setWidth(500);
        this.setCaption("P R A C T I C A N D O");
        this.addListenerOnce("resize", this.center, this);
        this.setModal(false);
        this.setLayout(new qx.ui.layout.VBox(10));

        this.contPractice = new qx.ui.container.Composite();
        this.contPractice.setLayout(new qx.ui.layout.VBox(10));
        this.contPractice.setPadding(15);

        this.btnPractice = new qx.ui.form.Button("PRACTICE");
        this.contPractice.add(this.btnPractice);

        this.btnPractice.addListener("execute", function(){

            this.fireEvent("practicEvent");

        }, this );

        this.btnPracticeII = new qx.ui.form.Button("PRACTICE II");
        this.contPractice.add(this.btnPracticeII);

        this.btnPracticeII.addListener("execute", function(){

            this.fireEvent("practicEvent2");

        }, this );

        this.btnPracticeIII = new qx.ui.form.Button("SALIR");
        this.contPractice.add(this.btnPracticeIII);

        this.btnPracticeIII.addListener("execute", function(){

            this.fireEvent("practicEvent3");
            this.fireEvent("logOUT");

        }, this );

        this.add(this.contPractice);

    },

    members: {

    }
});