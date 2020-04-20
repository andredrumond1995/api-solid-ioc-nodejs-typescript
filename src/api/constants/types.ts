const types = {
  user: {
    userService: Symbol.for("userService"),
    userRepository: Symbol.for("userRepository"),
    userRepositoryImplMysql: Symbol.for("userRepositoryImplMysql"),
  },
  error: Symbol.for("error"),
};

export default types;
