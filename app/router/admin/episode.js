const { Router } = require("express");
const episodeController = require("../../controllers/admin/course/episode.controller");
const { uploadVideo } = require("../../utils/multer");


const router = Router();

router.post("/add" ,uploadVideo.single("video"), episodeController.addNewEpisode);
router.delete("/remove/:episodeId" , episodeController.removeEpisodeById);
router.patch("/update/:episodeId" , uploadVideo.single("video") , episodeController.updateEpisode);


module.exports = {
    AdminApiEpisodeRouter : router
}