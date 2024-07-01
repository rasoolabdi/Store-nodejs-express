const { Router } = require("express");
const roomController = require("../../controllers/support/room.controller");
const { uploadFile } = require("../../utils/multer");


const router = Router();

router.post("/add" , uploadFile.single("image") ,roomController.addRoom);
router.get("/getAllRooms" , roomController.getListOfRooms);

module.exports = {
    ApiRoomRouter: router
}