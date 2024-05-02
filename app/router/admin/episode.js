const { Router } = require("express");
const episodeController = require("../../controllers/admin/course/episode.controller");
const { uploadVideo } = require("../../utils/multer");


const router = Router();

router.post("/add" ,uploadVideo.single("video"), episodeController.addNewEpisode);

module.exports = {
    AdminApiEpisodeRouter : router
}