sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            
        },
        OnPress1: function(oEvent) {
			
			// var odata = oEvent.getSource().getBindingContext().getObject();
			// this.getView().getModel("argomento").setData(odata);
			this.getOwnerComponent().getRouter().navTo("RouteView2");
        },
        OnPress2: function(oEvent) {
			
			// var odata = oEvent.getSource().getBindingContext().getObject();
			// this.getView().getModel("argomento").setData(odata);
			this.getOwnerComponent().getRouter().navTo("RoutePersonale1");
        },
    });
});


