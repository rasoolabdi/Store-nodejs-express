const { Router } = require("express");
const episodeController = require("../../controllers/admin/course/episode.controller");


const router = Router();

router.post("/add" , episodeController.addNewEpisode);

module.exports = {
    AdminApiEpisodeRouter : router
}