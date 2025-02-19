sap.ui.define([
    "sap/ui/core/mvc/Controller",    
    "sap/ui/core/library",
    "sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/Text"
], (Controller, coreLibrary, Dialog, Button, mobileLibrary, Text) => {
    "use strict";

    // shortcut for sap.m.ButtonType
	var ButtonType = mobileLibrary.ButtonType;

	// shortcut for sap.m.DialogType
	var DialogType = mobileLibrary.DialogType;

	// shortcut for sap.ui.core.ValueState
	var ValueState = coreLibrary.ValueState;

    return Controller.extend("aerolineastedn.controller.tabla", {
        onInit() {
        },

        openpopup: function() {
            if (!this.oSuccessMessageDialog) {
				this.oSuccessMessageDialog = new Dialog({
					type: DialogType.Message,
					title: "Success",
					state: ValueState.Success,
					content: new Text({ text: "Este PopUp fue creado con exito!." }),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "OK",
						press: function () {
							this.oSuccessMessageDialog.close();
						}.bind(this)
					})
				});
            }
                this.oSuccessMessageDialog.open();
        }

    });
});