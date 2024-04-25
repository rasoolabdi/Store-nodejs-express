const createHttpError = require("http-errors");
const ProductModel = require("../../models/products");
const { deleteFileInPublic, ListOfImagesFromRequest, copyObject, setFeatures } = require("../../utils/function");
const { createProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");
const { ObjectIdValidator } = require("../../validators/public.validator");
const {StatusCodes: HttpStatus} = require("http-status-codes");


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
                data: {
                    statusCode: HttpStatus.CREATED,
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
            const data = copyObject(req.body);
            data.images = ListOfImagesFromRequest(req?.files || [] , req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            data.features =  setFeatures(productBody);
            let nullishData = [""," ","0" , 0, null, undefined];
            let blackListFields = ["bookmarks","deslikes","comments","likes","supplier","width", "height", "weight", "colors","length"];
            Object.keys(data).forEach((key) => {
                if(blackListFields.includes(key)) delete data[key];
                if(typeof data[key] === "string") data[key] = data[key].trim();
                if(nullishData.includes(data[key])) delete data[key];
                if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map((item) => item.trim());
                if(Array.isArray(data[key]) && data[key].length == 0) delete data[key];
            });

            return res.status(HttpStatus.OK).json(data);


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
                data: {
                    statusCode: HttpStatus.OK,
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
                data: {
                    statusCode: HttpStatus.OK,
                    products
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async searchIndex(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    }

    async getOneProduct(req,res,next) {
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
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