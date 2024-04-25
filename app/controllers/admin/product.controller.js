const createHttpError = require("http-errors");
const ProductModel = require("../../models/products");
const { deleteFileInPublic, ListOfImagesFromRequest } = require("../../utils/function");
const { createProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");
const { ObjectIdValidator } = require("../../validators/public.validator");


class ProductController extends Controller {


    async addProduct(req,res,next) {
        try {
            const images = ListOfImagesFromRequest(req?.files  || [] , req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            // req.body.image = path.join(productBody.fileUploadPath , productBody.filename);
            const {title , text , short_text , category, tags, count, discount, price ,type, width, height, weight, colors,length} = productBody;
            const supplier = req.user._id;
            let feature = {};
            if(width || weight || height || length) {
                if(!width) feature.width = 0;
                else feature.width = width;
                if(!height) feature.height = 0;
                else feature.height = height;
                if(!weight) feature.weight = 0;
                else feature.weight = weight;
                if(!length) feature.length = 0;
                else feature.length = length;
                if(!colors) feature.colors = [];
                else feature.colors = colors;
            }
           
            await ProductModel.create({
                title , 
                text ,
                short_text , 
                category, 
                tags, 
                count, 
                discount, 
                price, 
                images, 
                feature , 
                supplier,
                type,
                
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
            const products = await ProductModel.find({} , {__v: 0});
            if(!products) {
                throw new createHttpError.NotFound("محصولات مورد نظر یافت نشد .")
            }
            
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
            const {id} = req.params;
            const product = await this.findProductById(id);
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    product
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async findProductById(productId) {
        const {id} = await ObjectIdValidator.validateAsync({id: productId});
        const products = await ProductModel.findById({_id: id});
        if(!products) {
            throw createHttpError.NotFound("محصول مورد نظر یافت نشد")
        }
        return products;
    }
}

module.exports = new ProductController();