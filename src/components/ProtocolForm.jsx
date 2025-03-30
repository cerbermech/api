import React, { useState, useEffect } from 'react';
import { fetchClientByPhone, upsertClient } from '../api/YclientsService';

function ProtocolForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    inn: '',
    diagnosis: '',
    treatmentPlan: '',
    procedureDate: '',
    procedureDuration: '',
  });
  const [existingClient, setExistingClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Поиск клиента по телефону
  useEffect(() => {
    const checkClientExistence = async () => {
      if (formData.phone.length >= 10) {
        setLoading(true);
        setError('');
        const client = await fetchClientByPhone(formData.phone);
        if (client) {
          setExistingClient(client);
          setFormData((prevData) => ({
            ...prevData,
            fullName: client.name || '',
            inn: client.inn || '',
            diagnosis: client.diagnosis || '',
            treatmentPlan: client.treatment_plan || '',
            procedureDate: client.procedure_date || '',
            procedureDuration: client.procedure_duration || '',
          }));
        } else {
          setExistingClient(null);
        }
        setLoading(false);
      }
    };

    checkClientExistence();
  }, [formData.phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем обязательные поля
    if (!formData.fullName || !formData.phone) {
      alert('Пожалуйста, заполните обязательные поля: ФИО и телефон.');
      return;
    }

    const dataToSend = {
      name: formData.fullName,
      phone: formData.phone,
      inn: formData.inn || '',
      diagnosis: formData.diagnosis || '',
      treatment_plan: formData.treatmentPlan || '',
      procedure_date: formData.procedureDate || '',
      procedure_duration: formData.procedureDuration || '',
    };

    try {
      const response = await upsertClient(dataToSend); // Передаем данные в YClients API
      console.log('Ответ от YClients:', response);
      alert('Данные успешно сохранены!');
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error.message || error);
      alert(`Ошибка: ${error.message || 'Не удалось сохранить данные.'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="ФИО"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Телефон"
        required
      />
      {loading && <p>Загружаем данные клиента...</p>}
      {error && <p>{error}</p>}
      {existingClient && (
        <p>Клиент найден: {existingClient.name}</p>
      )}
      <input
        type="text"
        name="inn"
        value={formData.inn}
        onChange={handleChange}
        placeholder="ИНН"
      />
      <input
        type="text"
        name="diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
        placeholder="Диагноз"
      />
      <input
        type="text"
        name="treatmentPlan"
        value={formData.treatmentPlan}
        onChange={handleChange}
        placeholder="План лечения"
      />
      <input
        type="date"
        name="procedureDate"
        value={formData.procedureDate}
        onChange={handleChange}
        placeholder="Дата процедуры"
      />
      <input
        type="number"
        name="procedureDuration"
        value={formData.procedureDuration}
        onChange={handleChange}
        placeholder="Длительность процедуры"
      />
      <button type="submit">Сохранить</button>
    </form>
  );
}

export default ProtocolForm;