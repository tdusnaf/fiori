/*global QUnit*/

sap.ui.define([
	"aerolineastedn/controller/tabla.controller"
], function (Controller) {
	"use strict";

	QUnit.module("tabla Controller");

	QUnit.test("I should test the tabla controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
