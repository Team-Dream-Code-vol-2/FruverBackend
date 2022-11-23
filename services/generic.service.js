class GenericService {
    constructor (GenericModel) {
        this.model = GenericModel
    }

    async create (data) {
        const model = new this.model(data);
        return model.save();
    }

    async find (filters = {}, opts = {}) {
        return this.model.find(filters, opts);
    }

    async findOne (filters= {}) {
        return this.model.findOne(filters);
    }

    async update (filters, data) {
        return this.model.findOneAndUpdate(filters, data, {
            new: true
        });
    }

    async delete (filters) {
        return this.model.findOneAndDelete(filters);
    }
}

module.exports = { GenericService };
