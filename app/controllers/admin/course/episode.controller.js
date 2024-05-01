const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");


class EpisodeController extends Controller {

    async addNewEpisode(req,res,next) {
        try {
            const validationEpisode = await createEpisodeSchema.validateAsync(req.body);
            const {title , text , type , time , chapterId , courseId} = validationEpisode;
            
        }
        catch(error) {
            next(error)
        }
    }

};

module.exports = new EpisodeController();