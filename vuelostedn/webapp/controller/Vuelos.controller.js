sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/ODataUtils"
], (Controller,  ODataUtils) => {
    "use strict";

    return Controller.extend("vuelostedn.controller.Vuelos", {
        onInit: function () {
			this.getView().bindElement("/ScarrSet");
		},
		onSearch: function() {
			var oSmartFilterBar = this.byId("smartFilterBar"),
				oFilterResult = this.byId("filterResult"),
				oFilterProvider = oSmartFilterBar._oFilterProvider;
			/** The following code is used only for the purpose of the demo to visualize the filter query
				and since private controls are invoked it shouldn't be used in application scenarios! */
			oFilterResult.setText(decodeURIComponent(
				ODataUtils.createFilterParams(
					oSmartFilterBar.getFilters(),
					oFilterProvider._oParentODataModel.oMetadata,
					oFilterProvider._oMetadataAnalyser._getEntityDefinition(oFilterProvider.sEntityType)
				)
			));
		}
    });
});