const { Router } = require("express");
const namespaceController = require("../../controllers/support/namespace.controller");

const router = Router();

router.post("/add" , namespaceController.addNamespace);
router.get("/getAllNamespace" , namespaceController.getListOfNamespaces);

module.exports = {
    ApiNamespaceRouter: router
}