const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.author = ctx.state.user.id;
      entity = await strapi.services.invoice.create(data, { files });
    } else {
      ctx.request.body.author = ctx.state.user.id;
      entity = await strapi.services.invoice.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.invoice });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [invoice] = await strapi.services.invoice.find({
      id: ctx.params.id,
      author: ctx.state.user.id,
    });

    if (!invoice) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.invoice.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.invoice.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.invoice });
  },
  
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.invoice.search(ctx.query);
    } else {
      entities = await strapi.services.invoice.find({author : ctx.state.user.id});
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.invoice }));
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.invoice.findOne({ id, author: ctx.state.user.id,});
    return sanitizeEntity(entity, { model: strapi.models.invoice });
  },
};
