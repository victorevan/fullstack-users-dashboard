import { schema } from 'normalizr';

const userSchema = new schema.Entity(
  'users',
  {},
  { idAttribute: '_id' },
);

const allUsersSchema = new schema.Array(userSchema);

export default allUsersSchema;
