const messageNotCard = 'Карточка с указанным id не найдена';
const messageNotFound = 'Передан несуществующий id карточки';
const messageDataError = 'Переданы некорректные данные';
const messageNotUser = 'Пользователь с указанным id не найден';
const messageErrorEmailOrPassword = 'Неправильные почта или пароль';
const messageAuthorizationError = 'Пользователь не авторизован';
const messageNoRights = 'Нет прав';
const messageEmail = 'Данный эмеил уже занят другим пользователем';
const CREATED = 201;
const URL_REGEXP = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;
module.exports = {
  messageNotCard,
  messageDataError,
  messageNotFound,
  messageAuthorizationError,
  messageErrorEmailOrPassword,
  messageNotUser,
  messageNoRights,
  messageEmail,
  CREATED,
  URL_REGEXP,
};
