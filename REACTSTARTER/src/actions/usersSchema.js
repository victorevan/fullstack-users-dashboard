import { schema } from 'normalizr';

const userSchema = new schema.Entity(
  'users',
  {},
  { idAttribute: '_id' },
);

const usersSchema = new schema.Array(userSchema);

export default usersSchema;
