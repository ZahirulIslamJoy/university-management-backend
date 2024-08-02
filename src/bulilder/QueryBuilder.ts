import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  filter(excludeFields: string[]) {
    const queryObj = { ...this.query };
    excludeFields.forEach((item) => delete queryObj[item]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort  = (this?.query?.sort as string).split(',')?.join(' ') || 'createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  paginate() {
    const limit = Number(this.query?.limit) || 10;
    const page = Number(this.query?.page) || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  fields() {
    let fields = '';
    if (this.query?.fields) {
      fields = (this?.query?.fields as string).split(',')?.join(' ');
    }
    this.modelQuery = this?.modelQuery.select(fields as string);
    return this;
  }
}

export default QueryBuilder;
