export const TYPES = {
  CartController: Symbol.for('CartController'),
  AuthController: Symbol.for('AuthController'),
  UserController: Symbol.for('UserController'),
  CourseController: Symbol.for('CourseController'),

  CartService: Symbol.for('CartService'),
  UserService: Symbol.for('UserService'),
  CourseService: Symbol.for('CourseService'),

  CartRepository: Symbol.for('CartRepository'),
  UserRepository: Symbol.for('UserRepository'),
  CourseRepository: Symbol.for('CourseRepository'),

  ILogger: Symbol.for('ILogger'),
  ExeptionFilter: Symbol.for('ExeptionFilter'),
  ConfigService: Symbol.for('ConfigService'),
  MongoService: Symbol.for('MongoService'),
  Application: Symbol.for('Application'),
}
