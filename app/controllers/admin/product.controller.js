const ProductModel = require("../../models/products");
const { deleteFileInPublic } = require("../../utils/function");
const { createProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");


class ProductController extends Controller {


    async addProduct(req,res,next) {
        try {
            const productBody = await createProductSchema.validateAsync(req.body);
            req.body.image = path.join(productBody.filleUploadPath , productBody.filename);
            const image = req.body.image.replace(/\\/g,"/");
            const {title , text , short_text , category, tags, count, discount, price , width, height, weight, length} = productBody;
            const supplier = req.user._id;
            let feature = {} , type= "physical"
            if(width || weight || height || length) {
                if(!width) feature.width = 0;
                else feature.width = width;
                if(!height) feature.height = 0;
                else feature.height = height;
                if(!weight) feature.weight = 0;
                else feature.weight = weight;
                if(!length) feature.length = 0;
                else feature.length = length;
            }
            else {
                type= "virtual"
            }

            const product = await ProductModel.create({
                title , 
                text ,
                short_text , 
                category, 
                tags, 
                count, 
                discount, 
                price, 
                image, 
                feature , 
                supplier,
                type
            });
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: "ثبت محصول با موفقیت انجام شد"
                }
            });
        }
        catch(error) {
            deleteFileInPublic();
            next(error);
        }
    }

    async editProduct(req,res,next) {
        try {

        }
        catch(error) {
            next(error);
        }
    }

    async removeProduct(req,res,next) {
        try {

        }
        catch(error) {
            next(error);
        }
    }

    async getAllProducts(req,res,next) {
        try {
            const products = await ProductModel.find({});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    products
                }
            })

        }
        catch(error) {
            next(error);
        }
    }

    async getOneProduct(req,res,next) {
        try {

        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = new ProductController();