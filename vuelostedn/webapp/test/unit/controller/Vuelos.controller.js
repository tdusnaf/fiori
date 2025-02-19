/*global QUnit*/

sap.ui.define([
	"vuelostedn/controller/Vuelos.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Vuelos Controller");

	QUnit.test("I should test the Vuelos controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
