import { Document, HydratedDocument } from "mongoose";
import { SuccessCode } from "./success-code.util";

export class ResponseData {
    public name: string = "";
    public status: number = 200;
    public message: string = "";
    public metaData: any = null;
    constructor(code: string = SuccessCode.Sucessed, message: string = "", metaData: any | Document<any, {}, any> = null) {
        this.name = code;
        this.status = 200;
        this.message = message;
        this.metaData = metaData;
        switch (code) {
            case SuccessCode.Created:
                this.status = 201;
                break;
            case SuccessCode.Updated:
                this.status = 204;
                break;
            case SuccessCode.Deleted:
                this.status = 202;
                break;
            default:
                this.status = 200;
                break;
        }
    }
}