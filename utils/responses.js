const messageNotCard = 'Карточка с указанным id не найдена';
const messageNotFound = 'Передан несуществующий id карточки';
const messageDataError = 'Переданы некорректные данные';
const messageServerError = 'Ошибка сервера';
const messageNotUser = 'Пользователь с указанным id не найден';
const messageErrorEmailOrPassword = 'Неправильные почта или пароль';
const messageAuthorizationError = 'Пользователь не авторизован';
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports = {
  messageNotCard,
  messageDataError,
  messageNotFound,
  messageServerError,
  messageAuthorizationError,
  messageErrorEmailOrPassword,
  messageNotUser,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
};
