/*global QUnit*/

sap.ui.define([
	"filetedn/controller/File-Tedn.controller"
], function (Controller) {
	"use strict";

	QUnit.module("File-Tedn Controller");

	QUnit.test("I should test the File-Tedn controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
