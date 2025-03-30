// import axios from 'axios';

// /**
//  * Базовый URL для API YClients.
//  */
// const API_URL = 'https://api.yclients.com/api/v1/clients/1267825/';

// /**
//  * Токены авторизации для API YClients.
//  */
// const PARTNER_TOKEN = 'wrctkwtmttayztg5remh';
// const USER_TOKEN = '9fde2d250f4dc43f1d0e7ed494d24976';

// /**
//  * Объект кеша для хранения результатов запросов.
//  */
// const cache = {};

// /**
//  * Валидирует номер телефона.
//  * @param {string} phone - Номер телефона для проверки.
//  * @returns {boolean} - Возвращает true, если номер телефона валиден.
//  */
// const validatePhone = (phone) => {
//   const phoneRegex = /^\+?[0-9]{10,15}$/; // Пример регулярного выражения для номера телефона
//   return phoneRegex.test(phone);
// };

// /**
//  * Ищет клиента по номеру телефона в YClients.
//  * @param {string} phone - Номер телефона клиента.
//  * @returns {Promise<Object|null>} - Данные клиента или null, если клиент не найден.
//  */
// export const fetchClientByPhone = async (phone) => {
//   // Проверяем валидность номера телефона
//   if (!validatePhone(phone)) {
//     throw new Error('Некорректный номер телефона');
//   }

//   // Форматируем номер телефона (добавляем +, если его нет)
//   const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

//   // Проверяем кеш
//   if (cache[formattedPhone]) {
//     return cache[formattedPhone];
//   }

//   try {
//     // Выполняем GET-запрос к API YClients
//     const response = await axios.get(API_URL, {
//       headers: {
//         Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
//         "Content-Type": "application/json",
//         "Accept": "application/vnd.api.v2+json",
//       },
//       params: {
//         phone: formattedPhone,
//       },
//     });

//     // Проверяем формат ответа и сохраняем в кеш
//     const result = Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
//     cache[formattedPhone] = result;
//     return result;
//   } catch (error) {
//     // Обработка ошибок
//     handleApiError(error, 'Ошибка при поиске клиента');
//   }
// };

// /**
//  * Создает нового клиента в YClients.
//  * @param {Object} clientData - Данные клиента для создания.
//  * @returns {Promise<Object>} - Данные созданного клиента.
//  */
// const createClient = async (clientData) => {
//   try {
//     const response = await axios.post(API_URL, clientData, {
//       headers: {
//         Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'Ошибка при создании клиента');
//   }
// };

// /**
//  * Обновляет данные существующего клиента в YClients.
//  * @param {number} clientId - ID клиента.
//  * @param {Object} clientData - Данные клиента для обновления.
//  * @returns {Promise<Object>} - Данные обновленного клиента.
//  */
// const updateClient = async (clientId, clientData) => {
//   try {
//     const response = await axios.put(`${API_URL}${clientId}/`, clientData, {
//       headers: {
//         Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     handleApiError(error, 'Ошибка при обновлении клиента');
//   }
// };

// /**
//  * Создает нового клиента или обновляет существующего в YClients.
//  * @param {Object} clientData - Данные клиента.
//  * @returns {Promise<Object>} - Данные клиента после операции.
//  */
// export const upsertClient = async (clientData) => {
//   try {
//     // Проверяем, существует ли клиент с таким номером телефона
//     const existingClient = await fetchClientByPhone(clientData.phone);

//     if (existingClient) {
//       // Если клиент найден, обновляем его
//       return updateClient(existingClient.id, clientData);
//     } else {
//       // Если клиент не найден, создаем нового
//       return createClient(clientData);
//     }
//   } catch (error) {
//     handleApiError(error, 'Ошибка при добавлении или обновлении клиента');
//   }
// };

// /**
//  * Обрабатывает ошибки API.
//  * @param {Error} error - Ошибка, возникшая при работе с API.
//  * @param {string} message - Сообщение об ошибке для логирования.
//  * @throws {Error} - Выбрасывает ошибку с детальным описанием.
//  */
// const handleApiError = (error, message) => {
//   if (error.response) {
//     const { status, data } = error.response;
//     console.error(`Ошибка API (${status}):`, data);
//     throw new Error(`${message}: ${data.message || 'Неизвестная ошибка'}`);
//   } else if (error.request) {
//     console.error('Нет ответа от сервера:', error.request);
//     throw new Error(`${message}: Нет ответа от сервера`);
//   } else {
//     console.error('Ошибка:', error.message);
//     throw new Error(`${message}: ${error.message}`);
//   }
// };