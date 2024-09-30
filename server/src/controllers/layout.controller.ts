import { NextFunction, Request, Response } from "express";
import { ICategory, IFaq, LayoutModel } from "../models/layout.model";
import { ErrorException } from "../utils/response/error/error-exception.util";
import { ResponseData } from "../utils/response/success/success-response.util";
import { SuccessCode } from "../utils/response/success/success-code.util";
import cloudinary from "cloudinary";
import { ulid } from "ulid";

export const addLayout = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { type } = req.body;
        const isTypeExist = await LayoutModel.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorException("400",`${type} already exist`));
        }
        if (type.toLowerCase() === "banner") {
            const { title, subTitle } = req.body;
            const image = (req as any).file
            const b64 = Buffer.from(image.buffer).toString("base64");
            const dataURI = "data:" + (req as any).file.mimetype + ";base64," + b64;
            let banner:any = {
                _id:ulid(),
                type: "banner",
                banner:{
                    title,
                    subTitle
                }
            };

            if(image.buffer){
                const myCloud = await cloudinary.v2.uploader.upload(dataURI, {
                    folder: "layout",
                });
                banner.banner.image = {
                    _id:ulid(),
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            await LayoutModel.create(banner);
        }
        if (type.toLowerCase() === "faq") {
            const { faq } = req.body;
            const faqItems = await Promise.all(faq.map(async (item:IFaq) => {
                return {
                    question: item.question.toString(),
                    answer: item.answer.toString(),
                };
            }));
            await LayoutModel.create({ _id:ulid(),type: "faq", faq: faqItems });
        }
        if (type.toLowerCase() === "categories") {
            const { categories } = req.body;
            const categoriesItems = await Promise.all(categories.map(async (item:ICategory) => {
                return {
                    title: item.title,
                };
            }));
            await LayoutModel.create({
                _id:ulid(),
                type: "categories",
                categories: categoriesItems,
            });
        }
        res.status(200).json({
            message: "Layout berhasil dibuat",
        });
    }
    catch (error:any) {
        return next(new ErrorException(error.message));
    }
}

export const editLayout = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { type } = req.body;
        if (type === "banner") {
            const bannerData = await LayoutModel.findOne({ type: "Banner" });
            const { title, subTitle } = req.body;
            const image = (req as any).file
            const b64 = Buffer.from(image.buffer).toString("base64");
            const dataURI = "data:" + (req as any).file.mimetype + ";base64," + b64;

            const data:any = image.buffer
                ? bannerData
                : await cloudinary.v2.uploader.upload(dataURI, {
                    folder: "layout",
                });

            const banner = {
                _id:ulid(),
                type: "banner",
                image: {
                    public_id: image.buffer
                        ? bannerData?.banner?.image?.public_id
                        : data?.public_id,
                    url: image.buffer
                        ? bannerData?.banner?.image.url
                        : data?.secure_url,
                },
                title,
                subTitle,
            };
            await LayoutModel.findByIdAndUpdate(bannerData?._id, { banner });
        }
        if (type === "faq") {
            const { faq } = req.body;
            const FaqItem = await LayoutModel.findOne({ type: "FAQ" });
            const faqItems = await Promise.all(faq.map(async (item:any) => {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            }));
            await LayoutModel.findByIdAndUpdate(FaqItem?._id, {
                _id:ulid(),
                type: "faq",
                faq: faqItems,
            });
        }
        if (type === "categories") {
            const { categories } = req.body;
            const categoriesData = await LayoutModel.findOne({
                type: "categories",
            });
            const categoriesItems = await Promise.all(categories.map(async (item:any) => {
                return {
                    title: item.title,
                };
            }));
            await LayoutModel.findByIdAndUpdate(categoriesData?._id, {
                _id:ulid(),
                type: "categories",
                categories: categoriesItems,
            });
        }
        res.status(200).json({
            message: "Layout berhasil diperbarui",
        });
    }
    catch (error:any) {
        return next(new ErrorException(error.message));
    }
}

export const getLayoutByType = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { type } = req.params;
        const layout = await LayoutModel.findOne({ type:type.toLowerCase() });
        res.send(new ResponseData(SuccessCode.Sucessed,layout))
    }
    catch (error:any) {
        return next(new ErrorException(error.message));
    }
}