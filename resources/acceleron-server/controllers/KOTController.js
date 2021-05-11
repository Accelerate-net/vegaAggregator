"use strict";
let BaseController = ACCELERONCORE._controllers.BaseController;
let KOTService = require('../services/KOTService');

var _ = require('underscore');

class KOTController extends BaseController {

    constructor(request) {
        super(request);
        this.KOTService = new KOTService(request);
    }

    async getKOTById() {

        var kot_id = this.request.params.id;
        if (_.isEmpty(kot_id)) {
            throw new ErrorResponse(ResponseType.BAD_REQUEST, ErrorType.kot_id_is_empty_or_invalid);
        }
        return await this.KOTService.getKOTById(kot_id).catch(error => {
            throw error
          });
    }

    async fetchKOTsByFilter(){

        var filter_key = this.request.query.key;
        if (_.isEmpty(filter_key)) {
            throw new ErrorResponse(ResponseType.BAD_REQUEST, ErrorType.filter_key_is_empty_or_invalid);
        }

        let ALLOWED_FILTER_KEYS = ['all', 'dine', 'nondine'];
        if(!ALLOWED_FILTER_KEYS.includes(filter_key)){
            throw new ErrorResponse(ResponseType.BAD_REQUEST, ErrorType.invalid_filter);
        }

        return await this.KOTService.fetchKOTsByFilter(filter_key).catch(error => {
            throw error
          });
    }
}

module.exports = KOTController;