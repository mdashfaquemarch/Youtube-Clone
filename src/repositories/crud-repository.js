

class CrudRepo {

    constructor(model) {
        this.model = model
    }

    // create
    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;  
         } catch (error) {
             console.error("Something went wrong in the crud Repo : create");
             throw error;
         }
    }

    // read
    async get(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            console.error("Something went wrong in crud repo: get");
            throw error;
        }
    }

    // update
    async update(id, data) {
        try {
            const response = await this.model.findByIdAndUpdate(id, data, {new: true});
            return response;
        } catch (error) {
            console.error("Something went wrong in crud repo: update");
            throw error;
        }
    }

    // delete
    async destroy(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.error("Something went wrong in crud repo: destroy");
            throw error;
        }
    }

    // getAll

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            console.error("Something went wrong in crud repo: getAll");
            throw error;
        }
    }
}


export default CrudRepo;