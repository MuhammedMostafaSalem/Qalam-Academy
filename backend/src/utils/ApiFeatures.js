class ApiFeatures {
    constructor(model, queryString) {
        this.model = model;
        this.queryString = queryString;

        this.query = model.find();

        this.meta = {};
    }

    // Search
    search(searchFields = []) {
        const keyword = this.queryString.search?.trim();

        if (!keyword || !searchFields.length) return this;

        this.query = this.query.find({
            $or: searchFields.map((field) => ({
                [field]: {
                    $regex: keyword,
                    $options: "i",
                },
            })),
        });

        return this;
    }

    // Filter
    filter() {
        const queryObject = { ...this.queryString };

        const excludedFields = [
            "search",
            "sort",
            "fields",
            "page",
            "limit",
            "skip",
            "loadMore",
        ]

        excludedFields.forEach((field) => delete queryObject[field]);

        let queryStr = JSON.stringify(queryObject);

        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|in|ne)\b/g,
            (match) => `$${match}`
        );

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    // Sort
    sort(defaultSort = "-createdAt") {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");

            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort(defaultSort);
        }

        return this;
    }

    // Select Fields
    select() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields
                .split(",")
                .join(" ");

            this.query = this.query.select(fields);
        }

        return this;
    }

    // Limit
    limit(defaultLimit = 10) {
        const limit = Number(this.queryString.limit) || defaultLimit;

        this.limitValue = limit;

        this.query = this.query.limit(limit);

        return this;
    }

    // Skip
    skip() {
        const skip = Number(this.queryString.skip) || 0;

        this.skipValue = skip;

        this.query = this.query.skip(skip);

        return this;
    }

    // Load More
    loadMore(defaultLimit = 10) {
        const limit = Number(this.queryString.limit) || defaultLimit;

        const page = Number(this.queryString.page) || 1;

        const skip = (page - 1) * limit;

        this.limitValue = limit;

        this.skipValue = skip;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

    // Populate
    populate(populateOptions) {
        if (populateOptions) {
            this.query = this.query.populate(populateOptions);
        }

        return this;
    }

    // Meta
    async buildMeta() {
        const totalDocuments =
            await this.model.countDocuments(
                this.query.getFilter()
            );

        this.meta = {
            total: totalDocuments,
            limit: this.limitValue || totalDocuments,
            skip: this.skipValue || 0,
            hasMore:
                totalDocuments >
                ((this.skipValue || 0) + (this.limitValue || totalDocuments)),
        };

        return this;
    }
}

module.exports = ApiFeatures;