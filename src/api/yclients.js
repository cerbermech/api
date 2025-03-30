// import axios from 'axios';

// /**
//  * Базовый URL для API YClients.
//  */
// const API_URL = 'https://api.yclients.com/api/v1/clients/1267825/';

// /**
//  * Токены авторизации для API YClients.
//  */
// const PARTNER_TOKEN = 'wrctkwtmttayztg5remh'; // Ваш партнерский токен
// const USER_TOKEN = '9fde2d250f4dc43f1d0e7ed494d24976'; // Ваш пользовательский токен

// /**
//  * Ищет клиента по номеру телефона в YClients.
//  * @param {string} phone - Номер телефона клиента.
//  * @returns {Promise<Object[]>} - Массив данных клиентов или пустой массив, если клиент не найден.
//  */
// export const fetchClientByPhone = async (phone) => {
//   try {
//     const response = await axios.get(API_URL, {
//       headers: {
//         Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
//         "Content-Type": "application/json",
//         "Accept": "application/vnd.api.v2+json",
//       },
//       params: {
//         phone,
//       },
//     });

//     return Array.isArray(response.data) ? response.data : [];
//   } catch (error) {
//     handleApiError(error, 'Ошибка при поиске клиента');
//   }
// };

// /**
//  * Создает нового клиента или обновляет существующего через YClients API.
//  * @param {Object} clientData - Данные клиента.
//  * @returns {Promise<Object>} - Данные клиента после операции.
//  */
// export const upsertClient = async (clientData) => {
//   try {
//     const response = await axios.post(API_URL, clientData, {
//       headers: {
//         Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
//         "Content-Type": "application/json",
//         "Accept": "application/vnd.api.v2+json",
//       },
//     });

//     console.log("Ответ от YClients:", response.data);
//     return response.data;
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