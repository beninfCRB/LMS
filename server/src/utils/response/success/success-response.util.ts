import { SuccessCode } from "./success-code.util";

export class ResponseData extends Error {
    public status: number = 200;
    public metaData: any = null;
    constructor(code: string = SuccessCode.Sucessed, metaData: any = null) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.status = 200;
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