
// database realm schemas

export const USERS_SCHEMA = 'users';
export const FRIENDS_SCHEMA = 'friends';

// / user table
export const UsersSchema = {
  name: USERS_SCHEMA,
  primaryKey: 'userId',
  properties: {
    userId: 'int', // primary key
    userName: 'string',
    passWord: 'string',
  },
};

// friends table
export const FriendsSchema = {
  name: FRIENDS_SCHEMA,
  properties: {
    userName: 'string',
    name: 'string',
    mobile: 'string',
    email: 'string',
  },
};

// realm options
export const databaseOptions = {
  path: 'realmNeww.realm',
  schema: [UsersSchema, FriendsSchema],
  schemaVersion: 0,
};
