const createHttpError = require("http-errors");
const ProductModel = require("../../../models/products");
const { deleteFileInPublic, ListOfImagesFromRequest, copyObject, setFeatures, deleteInvalidPropertyInObject } = require("../../../utils/function");
const { createProductSchema } = require("../../../validators/admin/product.schema");
const Controller = require("../../controller");
const path = require("path");
const { ObjectIdValidator } = require("../../../validators/public.validator");
const {StatusCodes: HttpStatus} = require("http-status-codes");

const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    HEIGHT: "height",
    LENGTH: "length",
    COLORS: "colors"
}
Object.freeze(ProductBlackList);


class ProductController extends Controller {


    async addProduct(req,res,next) {
        try {
            const images = ListOfImagesFromRequest(req?.files  || [] , req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            // req.body.image = path.join(productBody.fileUploadPath , productBody.filename);
            const {title , text , short_text , category, tags, count, discount, price ,type} = productBody;
            const supplier = req.user._id;
            let features =  setFeatures(productBody);
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
                features , 
                supplier,
                type,
            });
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
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
            const {id} = req.params;
            const product = await this.findProductById(id);
            const data = copyObject(req.body);
            data.images = ListOfImagesFromRequest(req?.files || [] , req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            data.features =  setFeatures(productBody);
            let blackListFields = Object.values(ProductBlackList);
            deleteInvalidPropertyInObject( data, blackListFields);
            const updateProductResult = await ProductModel.updateOne({_id: product._id} , {$set: data});
            if(updateProductResult.modifiedCount == 0) {
                throw new {status: HttpStatus.INTERNAL_SERVER_ERROR , message: "خطا از سمت سرور رخ داده است ."}
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "محصول مورد نظر با موفقیت آپدیت شد ."
                }
            });
        }
        catch(error) {
            next(error);
        }
    }

    async removeProductById(req,res,next) {
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            const removeProduct = await ProductModel.deleteOne({_id: product});
            if(removeProduct.deletedCount == 0) throw new createHttpError.InternalServerError("خطا از سمت سرور رخ داده است . محصول مورد نظر حذف نشد .")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "محصول مورد نظر با موفقیت حذف شد ."
                }
            })

        }
        catch(error) {
            next(error);
        }
    }

    async getAllProducts(req,res,next) {
        try {
            const search = req?.query?.search || "";
            let products;
            if(search) {
                products = await ProductModel.find({
                    $text: {
                        $search: new RegExp(search , "ig")
                    }
                } , {__v: 0});
                if(!products) {
                    throw new createHttpError.NotFound("محصولات مورد نظر یافت نشد .")
                }
            }
            else{
                products = await ProductModel.find({} , {__v:0})
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
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
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
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