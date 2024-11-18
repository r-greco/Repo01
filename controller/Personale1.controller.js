


sap.ui.require([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, UIComponent, JSONModel, MessageBox) {
    "use strict";
    return Controller.extend("project1.controller.Personale1", {
        onInit: function () { 
            this.getView().setModel( new JSONModel(), "getPers");
            
            this.getRouter().getRoute("RoutePersonale1").attachPatternMatched(this.OnGet, this);
           
            this.x = this.getOwnerComponent().getModel("argPers").getData();
            var oRouter = this.getOwnerComponent().getRouter();
            this.getView().setModel(new JSONModel({ delete: false }), "deleteModel");
            
            // this.OnGet();
           

        },
        Onrefresh: function (oEvent) {
            // window.location.reload();
            var oTable= this.byId("TableP");
            oTable.getBinding("items").refresh();
        },
        OnHome: function (oEvent) {

            // var odata = oEvent.getSource().getBindingContext().getObject();
            // this.getView().getModel("argomento").setData(odata);
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        OnPage3: function (oEvent) {
            
            var oitem = oEvent.getSource();
            var obc = oitem.getBindingContext("getPers");

            if (obc != undefined) {
                var odata = obc.getObject();
                odata.action = "EDIT";
                this.getView().getModel("argPers").setData(odata);
                this.getOwnerComponent().getRouter().navTo("RoutePersonale2");
            }

            else {

                this.getOwnerComponent().getModel("argPers").setData({
                    nome: null,
                    cognome: null,
                    email: null,
                    numero_tel: null,
                    patentino: null,
                    action: "CREATE"
                });
                this.getOwnerComponent().getRouter().navTo("RoutePersonale2");
                console.log("ciao", this.getView().getModel("argPers").getData());
            }

        },
        onShowDel: function () {
            MessageBox.confirm("suca?");
            var oModel = this.getView().getModel("deleteModel");
            var oData = oModel.getData();

            // Impostiamo deleteVisible su true per tutte le righe
            oData.delete = !oData.delete;

            // Aggiorniamo il modello
            oModel.setData(oData);
        },

        onDelete: function(oEvent) {
            var oTable = this.byId("TableP"); // Otteniamo la tabella
            var selectedItems = oTable.getSelectedItems(); // Otteniamo gli elementi 
            

            let aSelectedData= [];
            selectedItems.forEach(item => {
                let oData = item.getBindingContext("getPers").getObject();
                aSelectedData.push(oData);
            });

            console.log(aSelectedData);
            
            // Controlla se ci sono selezioni
            if (aSelectedData.length === 0) {
                sap.m.MessageToast.show("Nessuna riga selezionata.");
                return;
            }
            
            var oModel = this.getView().getModel("getPers"); // Otteniamo il modello "getModel" associato alla vista
            var sUrl = this.getOwnerComponent().getModel().sServiceUrl; // Otteniamo l'URL del servizio
            for(var i=0; i<aSelectedData.length; i++){
            // selectedItems.forEach(function(oItem) 
                 // Otteniamo l'oggetto associato a quell'elemento (che contiene l'ID)
                 console.log(aSelectedData[i].id_ordine)
                // Prepara la chiamata DELETE per eliminare l'elemento dal backend
                var sDeleteUrl = sUrl + "Personale/" + aSelectedData[i].id_persona; // Componiamo l'URL per l'eliminazione
                
                // Effettuiamo la chiamata DELETE per ogni ordine selezionato
                jQuery.ajax({
                    url: sDeleteUrl,
                    contentType: "application/json",
                    type: "DELETE",
                    success: function(oResponse) {
                        // Successo: mostra un messaggio di successo
                        sap.m.MessageToast.show("Personale " + " eliminato con successo.");
                        
                        

                    },
                    error: function(error) {
                        // In caso di errore, mostra un messaggio di errore
                        sap.m.MessageToast.show("Errore nell'eliminazione del personale ");
                    },
                    async: false, // Sincrono per garantire che venga eliminato prima di continuare
                });
            };
            this.OnGet();
        
            // Rimuoviamo gli ordini selezionati dalla vista (rimuoviamo la selezione)
            oTable.removeSelections(true); // Deselect all items
        },
        

        OnGet : function()
        {   
            var oTable= this.byId("TableP");
           
            var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
            var that= this;
            jQuery.when(this.oInitialLoadFinishedDeferred).then(
                jQuery.proxy(function () {
        jQuery.ajax({
                      url: sUrl + "Personale",
                      contentType: "application/json",
                      type: "GET",
                      success: function (oData) {
                        

                        //that.getView().setModel(oData.value, 'getPers');
                        let oModel = that.getView().getModel('getPers');

                        oModel.setData(oData.value);
                        oModel.refresh();
                      
                        // var oModel = new sap.ui.model.json.JSONModel(x);

                        // // Settiamo il modello "argomento" sulla view
                        // that.getView().setModel(oModel, 'getPers');
                        // console.log(oModel);  
                       
                        

                      },
                      error: function (error) {
                       
                      },
  
                      async: false,
                    });
                    

            })); 
             
        },
        getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},




    });
});