sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/library",
    "sap/m/Dialog",
	"sap/m/Button",
    "sap/m/library",
	"sap/m/Text"
], (Controller, coreLibrary, Dialog, Button, mobileLibrary, Text) => {
	"use strict";

	var header_xcsrf_token;

	// shortcut for sap.m.ButtonType
	var ButtonType = mobileLibrary.ButtonType;

	// shortcut for sap.m.DialogType
	var DialogType = mobileLibrary.DialogType;

	// shortcut for sap.ui.core.ValueState
	var ValueState = coreLibrary.ValueState;

	return Controller.extend("filetedn.controller.File-Tedn", {
		onInit() {
			var oUploadSet = this.byId("UploadSet");

			oUploadSet.getDefaultFileUploader().setTooltip("");
			oUploadSet.getDefaultFileUploader().setIconOnly(true);
			oUploadSet.getDefaultFileUploader().setIcon("sap-icon://attachment");

			OData.request({
				requestUri: "/sap/opu/odata/SAP/ZTEDN_FILE_SRV/FileSet",
				method: "GET",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": "Fetch"
				}
			},
				function (data, response) {
					header_xcsrf_token = response.headers['x-csrf-token'];
				}
			);

		},

		onChange: function (oEvent) {
			var that = this;
			var oUploadCollection = oEvent.getSource();
			OData.request({
				requestUri: "/sap/opu/odata/SAP/ZTEDN_FILE_SRV/FileSet",
				method: "GET",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/atom+xml",
					"DataServiceVersion": "2.0",
					"X-CSRF-Token": "Fetch"
				}
			},
				function (data, response) {
					header_xcsrf_token = response.headers['x-csrf-token'];
				}
			);
		},

		onBeforeUploadStarts: function (oEvent) {
			oEvent.getSource().removeAllHeaderFields()
			var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,";
			var Name = oEvent.getParameter("item").getProperty("fileName");

			for (var i = 0; i < specialChars.length; i++) {
				Name = Name.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
			}
			Name = Name.toLowerCase();
			Name = Name.replace(/ /g, "_");
			Name = Name.replace(/á/gi, "a");
			Name = Name.replace(/é/gi, "e");
			Name = Name.replace(/í/gi, "i");
			Name = Name.replace(/ó/gi, "o");
			Name = Name.replace(/ú/gi, "u");
			Name = Name.replace(/ñ/gi, "n");
			var upload = oEvent.getSource();

			// Header Slug
			var oCustomerHeaderSlug = new sap.ui.core.Item({
				key: "slug",
				text: encodeURIComponent(Name)
			});

			oEvent.getSource().insertHeaderField(oCustomerHeaderSlug);
			var oCustomerHeaderSlug1 = new sap.ui.core.Item({
				key: "X-Requested-With",
				text: "XMLHttpRequest"
			});
			oEvent.getSource().insertHeaderField(oCustomerHeaderSlug1);
			var oCustomerHeaderSlug4 = new sap.ui.core.Item({
				key: "x-csrf-token",
				text: header_xcsrf_token
			});

			oEvent.getSource().insertHeaderField(oCustomerHeaderSlug4);

		},

		onUploadTerminated: function(oEvent) {
            if (!this.oSuccessDialog) {
				this.oSuccessDialog = new Dialog({
					type: DialogType.Message,
					title: "Success",
					state: ValueState.Success,
					content: new Text({ text: "Fichero subido con exito!." }),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "OK",
						press: function () {
							this.oSuccessDialog.close();
						}.bind(this)
					})
				});
            }
                this.oSuccessDialog.open();
        },

		onDownloadAttach: function (oEvent) {
			window.open(this.getView().getModel().getProperty(oEvent.getSource().getBindingContext().getPath() + "/File/Url"));
		},

		onFileDelete: function (oEvent) {

			// remove item from the model
			var oItem = oEvent.getParameter("item");
			var oModel = this.getView().getModel();

			var oUploadCollection = this.byId("UploadSet");			
			var aItems = oUploadCollection.getList().getItems();
			
			var oItemData = oItem?.getBindingContext()?.getObject();
			var iIndex = aItems.findIndex((item) => {
				return item.id == oItemData?.id;
			});
			if (iIndex > -1) {
				aItems.splice(iIndex, 1);
				oModel.setProperty("/FileSet", aItems);
			}
			var filename = oItem.getProperty('fileName');
			var mime_type = oItem.getProperty('mediaType');
			mime_type = mime_type.replace("/", "%2F");
			var that = this;
			var entity = "/FileSet(Mimetype='" + mime_type + "',Filename='" + filename + "')";
			oModel.remove(entity, {
				success: function (oData) {
					if (!that.oSuccessMessageDialog) {
						that.oSuccessMessageDialog = new Dialog({
							type: DialogType.Message,
							title: "Success",
							state: ValueState.Success,
							content: new Text({ text: "Fichero eleminado con exito" }),
							beginButton: new Button({
								type: ButtonType.Emphasized,
								text: "Cerrar",
								press: function () {
									that.oSuccessMessageDialog.close();
								}.bind(that)
							})
						});
					}

					that.oSuccessMessageDialog.open();
				},
				error: function (oData) {

				}
			})

		}


	});
});