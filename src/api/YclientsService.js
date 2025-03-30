import axios from 'axios';

// Константы API
const API_URL = 'https://api.yclients.com/api/v1/clients/1267825';
const PARTNER_TOKEN = 'wrctkwtmttayztg5remh';
const USER_TOKEN = '9fde2d250f4dc43f1d0e7ed494d24976';

// Валидирует номер телефона
const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

// Обрабатывает ошибки API
const handleApiError = (error, message) => {
  if (error.response) {
    console.error(`${message} (Ошибка API ${error.response.status}):`, error.response.data);
  } else if (error.request) {
    console.error(`${message} (Нет ответа от сервера):`, error.request);
  } else {
    console.error(`${message}:`, error.message);
  }
  return null;
};

// Поиск клиента по номеру телефона
export const fetchClientByPhone = async (phone) => {
  if (!validatePhone(phone)) {
    console.error('Некорректный номер телефона');
    return null;
  }

  const formattedPhone = phone.replace(/\D/g, '');
  console.log(`Поиск клиента: ${formattedPhone}`);

  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.api.v2+json',
      },
      params: { phone: formattedPhone },
    });

    const client = response.data?.data?.length ? response.data.data[0] : null;
    console.log('Найденный клиент:', client);
    return client;
  } catch (error) {
    return handleApiError(error, 'Ошибка при поиске клиента');
  }
};

// Создание нового клиента
export const createClient = async (clientData) => {
    try {
      const response = await axios.post(API_URL, clientData, {
        headers: {
          Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.api.v2+json',
        },
      });
      console.log('Клиент создан:', response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Ошибка при создании клиента');
    }
  };

// Обновление имени и телефона клиента
export const updateClient = async (clientId, name, phone) => {
    if (!clientId || !name || !phone) {
      console.error('Ошибка: отсутствуют данные для обновления');
      return null;
    }
  
    const companyId = 1267825; // ID вашей компании
    const url = `${API_URL}/${companyId}/${clientId}`;
  
    const updatedData = {
      name: name,
      phone: phone,
    };
  
    console.log(`Обновление клиента ${clientId}:`, updatedData);
  
    try {
      const response = await axios.patch(url, updatedData, {
        headers: {
          Authorization: `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.api.v2+json',
        },
      });
  
      console.log('Данные клиента обновлены:', response.data);
      return response.data;
    } catch (error) {
      return handleApiError(error, 'Ошибка при обновлении клиента');
    }
  };

// Создание или обновление клиента
export const upsertClient = async (clientData) => {
  try {
    const existingClient = await fetchClientByPhone(clientData.phone);
    if (existingClient) {
      return updateClient(existingClient.id, clientData);
    } else {
      return createClient(clientData);
    }
  } catch (error) {
    return handleApiError(error, 'Ошибка при добавлении или обновлении клиента');
  }
};