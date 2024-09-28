import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { ErrorException } from "../utils/response/error/error-exception.util";
import { ErrorCode } from "../utils/response/error/error-code.util";
import { CourseModel } from "../models/course.model";
import { ResponseData } from "../utils/response/success/success-response.util";
import { SuccessCode } from "../utils/response/success/success-code.util";
import { redis } from "../utils/redis.util";
import { ulid } from "ulid";

export const uploadCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;   
      const thumbnail = (req as any).file
      const b64 = Buffer.from(thumbnail.buffer).toString("base64");
      const dataURI = "data:" + (req as any).file.mimetype + ";base64," + b64;
      
      data._id = ulid()

      if (typeof data.prerequisites === 'string') {
        data.prerequisites = JSON.parse(data.prerequisites);
      }

      if (typeof data.benefits === 'string') {
        data.benefits = JSON.parse(data.benefits);
      }
      
      if (thumbnail.buffer) {
        const myCloud = await cloudinary.v2.uploader.upload(dataURI, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
        data.demoUrl = myCloud.secure_url
      }
      const course = await CourseModel.create(data);

      res.send(new ResponseData(SuccessCode.Created,course))
    } catch (error: any) {
      return next(new ErrorException(ErrorCode.UnknownError,error.message));
    }
  }

export const editCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = (req as any).file
      const b64 = Buffer.from(thumbnail.buffer).toString("base64");
      const dataURI = "data:" + (req as any).file.mimetype + ";base64," + b64;

      const courseId = req.params.id;

      const courseData = await CourseModel.findById(courseId);

      if (thumbnail && dataURI && courseData && courseData.thumbnail.public_id) {
        await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(dataURI, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else if(thumbnail && dataURI && courseData && !courseData.thumbnail.public_id) {
        const myCloud = await cloudinary.v2.uploader.upload(dataURI, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.send(new ResponseData(SuccessCode.Updated,course))
    } catch (error: any) {
      return next(new ErrorException(ErrorCode.UnknownError,error.message));
    }
  }

export const deleteCourse =   async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const course = await CourseModel.findById(id);

    if (!course) {
      return next(new ErrorException("course not found"));
    }

    await cloudinary.v2.uploader.destroy(course.thumbnail?.public_id)

    await course.deleteOne({ id });

    await redis.del(id);

    res.status(200).json({
      message: "Kursus berhasil dihapus",
    });
  } catch (error: any) {
    return next(new ErrorException(error.message));
  }
}

export const getSingleCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      const isCacheExist = await redis.get(courseId);

      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.send(new ResponseData(SuccessCode.Sucessed,course));
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days

        res.send(new ResponseData(SuccessCode.Sucessed,course));
      }
    } catch (error: any) {
        return next(new ErrorException(ErrorCode.UnknownError,error.message));
    }
  }

export const getAllCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseModel.find().select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );

      res.send(new ResponseData(SuccessCode.Sucessed,courses))
    } catch (error: any) {
        return next(new ErrorException(ErrorCode.UnknownError,error.message));
    }
  }