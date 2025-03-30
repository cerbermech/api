import React, { useState, useEffect } from 'react';
import { fetchClientByPhone, upsertClient } from '../api/YclientsService';
import PrintData from './PrintData'; // Путь к компоненту печати

function ProtocolForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    cardNumber: '',
    birthDate: '',
    doctor: '',
    service: '',
    labData: '',
    mriData: '',
    diagnosis: '',
    treatmentPlan: '',
    physiotherapy: '',
    impactArea: '',
    procedurePerformed: '',
    procedureNumber: '',
    procedureDate: '',
    procedureDuration: '',
    procedureDoctor: '',
  });

  const [existingClient, setExistingClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPrint, setShowPrint] = useState(false); // состояние для отображения печатной версии

  const printDocument = () => {
    window.print();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
  
    if (!formData.fullName || !formData.phone) {
      alert('Пожалуйста, заполните обязательные поля: ФИО и телефон.');
      return;
    }
  
    // Ваши действия с отправкой данных
    const dataToSend = {
      name: formData.fullName,
      phone: formData.phone,
      card_number: formData.cardNumber || '',
      birth_date: formData.birthDate || '',
      doctor: formData.doctor || '',
      service: formData.service || '',
      lab_data: formData.labData || '',
      mri_data: formData.mriData || '',
      diagnosis: formData.diagnosis || '',
      treatment_plan: formData.treatmentPlan || '',
      physiotherapy: formData.physiotherapy || '',
      impact_area: formData.impactArea || '',
      procedure_performed: formData.procedurePerformed || '',
      procedure_number: formData.procedureNumber || '',
      procedure_date: formData.procedureDate || '',
      procedure_duration: formData.procedureDuration || '',
      procedure_doctor: formData.procedureDoctor || '',
    };
  
    try {
      const response = await upsertClient(dataToSend); 
      console.log('Ответ от YClients:', response);
      alert('Данные успешно сохранены!');
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error.message || error);
      alert(`Ошибка: ${error.message || 'Не удалось сохранить данные.'}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="ФИО клиента"
          required
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Номер телефона"
          required
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        {loading && <p>Загружаем данные клиента...</p>}
        {error && <p>{error}</p>}
        {existingClient && <p>Клиент найден: {existingClient.name}</p>}
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="№ карты"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          placeholder="Дата рождения"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          placeholder="Врач"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleChange}
          placeholder="Услуга"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="labData"
          value={formData.labData}
          onChange={handleChange}
          placeholder="Данные лабораторно-инструментальных исследований"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="mriData"
          value={formData.mriData}
          onChange={handleChange}
          placeholder="Данные МРТ исследования"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Диагноз"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="treatmentPlan"
          value={formData.treatmentPlan}
          onChange={handleChange}
          placeholder="План лечения"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="physiotherapy"
          value={formData.physiotherapy}
          onChange={handleChange}
          placeholder="Физиотерапевтическое лечение"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="impactArea"
          value={formData.impactArea}
          onChange={handleChange}
          placeholder="Область воздействия"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="procedurePerformed"
          value={formData.procedurePerformed}
          onChange={handleChange}
          placeholder="Проведена процедура"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="text"
          name="procedureNumber"
          value={formData.procedureNumber}
          onChange={handleChange}
          placeholder="Номер процедуры по счету"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        <input
          type="datetime-local"
          name="procedureDate"
          value={formData.procedureDate}
          onChange={handleChange}
          placeholder="Дата/время"
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
        />
        
      </form>

      <div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', border: 'none', fontSize: '16px', marginTop: '20px' }}>
          Сохранить
        </button>
        {showPrint && <PrintData data={formData} />}
        <button onClick={printDocument} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '5px', border: 'none', fontSize: '16px', marginTop: '20px' }}>
          Печать
        </button>
      </div>
    </div>
  );
}

export default ProtocolForm;