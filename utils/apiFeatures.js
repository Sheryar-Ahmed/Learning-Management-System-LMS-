class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query; //find method
        this.queryStr = queryStr; // which thing to find
    }
    //for searching 
    search(key) {
        //user enter any kerword and it search throgh all the object keys even if three characters match or less than 3
        const keyword = this.queryStr.keyword
            ? {
                [key]: {
                    $regex: this.queryStr.keyword,
                    $options: "i" //case sensitive globally search it.
                }
            } : {};
        this.query = this.query.find({ ...keyword });
        return this; //return same class with new features
    };
    //for filtration, if you want you can add filter for pricing similarly
    filterByRating() {
        // remove other fields other than price
        const queryCopy = { ...this.queryStr }; //converting our query into an object;
        const removeFields = ['keywords'];
        removeFields.forEach(key => delete queryCopy[key]);
        this.query = this.query.find(queryCopy.rating ? queryCopy : {});
        return this;
    };
    // for pagination
    pagination(resultsPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultsPerPage * (currentPage - 1);

        this.query = this.query.limit(resultsPerPage).skip(skip);

        return this;
    };
}



module.exports = ApiFeatures;