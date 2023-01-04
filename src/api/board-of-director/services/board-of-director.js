'use strict';

/**
 * board-of-director service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::board-of-director.board-of-director');
