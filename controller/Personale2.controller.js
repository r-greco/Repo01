
sap.ui.require([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function(Controller, UIComponent, MessageToast) {
    "use strict";
    return Controller.extend("project1.controller.Personale2", {
        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();

           
        },
        OnHome: function(oEvent) {
			
			// var odata = oEvent.getSource().getBindingContext().getObject();
			// this.getView().getModel("argomento").setData(odata);
			this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        OnSave: function(oEvent)
        {  
            console.log("here",this.getOwnerComponent().getModel("argPers").getData());

            let objData = this.getOwnerComponent().getModel("argPers").getData();
            var oInp1= this.getView().byId("nome");
            var oInp2= this.getView().byId("cognome");
            var oInp3= this.getView().byId("email");
            var oInp4= this.getView().byId("tel");
            var oInp5= this.getView().byId("patentino");
            var bool= true;
            if(!oInp1.getValue())
            {
                oInp1.setValueState("Error");
                bool= false;
            }else{
                oInp1.setValueState("None");
                if(oInp1.getValue().length>=3)
                    {
                        oInp1.setValueState("None");
                        
                    }else{
                        oInp1.setValueState("Error");
                        bool= false;
                    }
            };
            if(!oInp2.getValue())
                {
                    oInp2.setValueState("Error");
                    bool= false;
            }else{
                oInp2.setValueState("None");
                    if(oInp2.getValue().length>=3)
                        {
                            oInp2.setValueState("None");
                            
                        }else{
                            oInp2.setValueState("Error");
                            bool= false;
                        }
            };
            if(!oInp3.getValue()){
                oInp3.setValueState("Error");
                oInp3.setValueStateText("inserire come nell'es. : pippo@gmail.com")
                bool = false;
              }else{
                oInp3.setValueState("None");
                if(/^[A-Za-z0-9]{3,}@[A-Za-z0-9]{3,}\.[A-Za-z]{2,}$/.test(oInp3.getValue())){
                    oInp3.setValueState("None");
                 
                }else{
                    oInp3.setValueState("Error");
                    oInp3.setValueStateText("inserire come nell'es. : pippo@gmail.com")
                  bool= false;
                }
              };
              if(!oInp4.getValue())
              {
                oInp4.setValueState("Error");
                bool = false;
              }else{
                oInp4.setValueState("None");
                    if(oInp4.getValue().length<=10)
                    {
                        oInp4.setValueState("None");
                    }else
                    {
                        oInp4.setValueState("Error");
                        oInp4.setValueStateText("inserire come nell'es. : 39179687896")
                        bool = false;
                    }
              }
            
            if(bool==false)
            {
                return;
            };


            var obj= {
                ID: this.getView().byId("ID").getValue(),
                nome : this.getView().byId("nome").getValue(),
                cognome : this.getView().byId("cognome").getValue(),
                email: this.getView().byId("email").getValue(),
                tel : this.getView().byId("tel").getValue(),
                patentino : this.getView().byId("patentino").getValue(),
            };
            let oModel= this.getView().getModel("argPers");
            var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
            var that= this;

            if(objData.action==="CREATE")
            {
                var dataString= JSON.stringify(obj);
                console.log(dataString)
                jQuery.when(this.oInitialLoadFinishedDeferred).then(
                    jQuery.proxy(function () {
      jQuery.ajax({
                          url: sUrl + "Personale",
                          contentType: "application/json",
                          type: "POST",
                          data: dataString,
                          dataType: "json",
                          success: function (oData, oResponse) {
                            var msg = "Updated Succesfully!";
                            sap.m.MessageToast.show(msg);
        
                            var oRouter = that.getOwnerComponent().getRouter();
                            oRouter.navTo("RoutePersonale2");
                            
                          },
                          error: function (error) {
                            var msg = "Data not Updated Correctly!";
                            sap.m.MessageToast.show(msg);
                          },
      
                          async: false,
                        });
                        history.go(-1);
                        oModel.refresh();
                        var oTable= this.byId("TableP");
                        oTable.getBinding("items").refresh();
                            
                }));
                
               
               
                
      
            }else if (objData.action === "EDIT") {
                // Aggiungi l'ID per aggiornare il record esistente
                
                var dataString = JSON.stringify(obj);
                jQuery.ajax({
                    url: sUrl + "Personale/" + obj.ID,  // PUT per aggiornare un record
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