class GenericController {
    constructor (GenericService) {
        this.service = GenericService;
    }

    async create ({ body:  data }, res, next) {
        try { res.status(201).json(await this.service.create(data)); }
        catch (error) { next(error); }
    }

    async find ({ query: { filters = {} } }, res, next) {
        try { res.status(200).json(await this.service.find(filters)); }
        catch (error) { next(error); }
    }

    async findOne ({ params:  { id } }, res, next) {
        try { res.status(200).json(await this.service.findOne({ _id: id })); }
        catch (error) { next(error); }
    }

    async update ({ params:  { id }, body: data }, res, next) {
        try { res.status(200).json(await this.service.update({ _id: id }, data)); }
        catch (error) { next(error); }
    }

    async delete ({ params:  { id } }, res, next) {
        try { res.status(200).json(await this.service.delete({ _id: id })); }
        catch (error) { next(error); }
    }
}

module.exports = { GenericController }