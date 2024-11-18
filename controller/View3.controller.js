sap.ui.require([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function(Controller, UIComponent, MessageToast) {
    "use strict";
    return Controller.extend("project1.controller.View3", {
        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            this.x= this.getOwnerComponent().getModel("argomento").getData();
           
           
        },
        OnHome: function(oEvent) {
			
			// var odata = oEvent.getSource().getBindingContext().getObject();
			// this.getView().getModel("argomento").setData(odata);
			this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        OnSave: function(oEvent)
        {  
            var oInp1= this.getView().byId("id_ordine");
            var oInp2= this.getView().byId("tipo");
            var oInp3= this.getView().byId("data_ordine");
            var bool= true;
            if(!oInp1.getValue())
            {
                oInp1.setValueState("Error");
                bool= false;
            }else{
                oInp1.setValueState("None");
            };
            if(!oInp2.getValue())
                {
                    oInp2.setValueState("Error");
                    bool= false;
            }else{
                oInp2.setValueState("None");
                    if(oInp2.getValue().length>=2)
                        {
                            oInp2.setValueState("None");
                            
                        }else{
                            oInp2.setValueState("Error");
                            bool= false;
                        }
            };
            if(!oInp3.getValue())
            {
                oInp3.setValueState("Error");
                bool= false;
            }else{
                const CurrentDate= new Date();
                const minimumDate = new Date();
                const Cdate= CurrentDate.toISOString().split("T")[0];
                minimumDate.setDate(CurrentDate.getDate() + 3);
                const fMinimumDate = minimumDate.toISOString().split("T")[0];

                console.log('xxxxxxxxxx',oInp3.getValue());
                console.log(fMinimumDate);
                if(fMinimumDate<=oInp3.getValue())
                {
                    oInp3.setValueState("None")
                }else
                {
                    oInp3.setValueState("Error");
                    sap.m.MessageToast.show("Inserisci Almeno 3 giorni dopo l'attuale data");
                    bool= false;
                }

            };
            if(bool==false)
            {
                return;
            };









            var obj= {
                id_ordine : this.getView().byId("id_ordine").getValue(),
                tipo : this.getView().byId("tipo").getValue(),
                quantita: this.getView().byId("quantita").getValue(),
                data_ordine : this.getView().byId("data_ordine").getValue(),
            };
            var omodel= this.getView().getModel("argomento");
            var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
            
            console.log("aa", this.x);
            if(this.x.action==="CREATE")
            {
                var dataString= JSON.stringify(obj);
                jQuery.when(this.oInitialLoadFinishedDeferred).then(
                    jQuery.proxy(function () {
      jQuery.ajax({
                          url: sUrl + "Ordini",
                          contentType: "application/json",
                          type: "POST",
                          data: dataString,
                          dataType: "json",
                          success: function (oData, oResponse) {
                            var msg = "Updated Succesfully!";
                            sap.m.MessageToast.show(msg);
                            var oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("RouteView2");
                          },
                          error: function (error) {
                            var msg = "Data not Updated Correctly!";
                            sap.m.MessageToast.show(msg);
                          },
      
                          async: false,
                        });
                }));
               
                history.go(-1);
                var oTable= this.byId("Table");
                oTable.getBinding("items").refresh();
                
      
            }else if (this.x.action === "EDIT") {
                // Aggiungi l'ID per aggiornare il record esistente
                
                var dataString = JSON.stringify(obj);
                jQuery.ajax({
                    url: sUrl + "Ordini/" + obj.id_ordine,  // PUT per aggiornare un record
                    contentType: "application/json",
                    type: "PUT",
                    data: dataString,
                    dataType: "json",
                    success: function (oData, oResponse) {
                        sap.m.MessageToast.show("Updated Successfully!");
                    },
                    error: function (error) {
                        sap.m.MessageToast.show("Data not Updated Correctly!");
                        console.error(error); // Aggiungi dettagli sull'errore
                    },
                    async: false
                });
                
               history.go(-1); // Torna alla pagina precedente
            }
        }
        
    });
});