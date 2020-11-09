export class ResponseModel {
    StatusCode;
    Message;
    Data;

    constructor(jsonData) {
        this.StatusCode = jsonData.StatusCode;
        this.Message = jsonData.Message;
        this.Data = jsonData.Data
    }
}
