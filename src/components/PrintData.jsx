import React from 'react';

function PrintData({ data }) {
  return (
    <div>
      <h2>Данные клиента:</h2>
      <p><strong>ФИО клиента:</strong> {data.fullName}</p>
      <p><strong>Номер телефона:</strong> {data.phone}</p>
      <p><strong>Дата рождения:</strong> {data.birthDate}</p>
      <p><strong>Врач:</strong> {data.doctor}</p>
      <p><strong>Услуга:</strong> {data.service}</p>
      <p><strong>Данные лабораторно-инструментальных исследований:</strong> {data.labData}</p>
      <p><strong>Диагноз:</strong> {data.diagnosis}</p>
      <p><strong>План лечения:</strong> {data.treatmentPlan}</p>
      <p><strong>Физиотерапевтическое лечение:</strong> {data.physiotherapy}</p>
      <p><strong>Область воздействия:</strong> {data.impactArea}</p>
      <p><strong>Проведена процедура:</strong> {data.procedurePerformed}</p>
      <p><strong>Номер процедуры по счету:</strong> {data.procedureNumber}</p>
      <p><strong>Дата/время:</strong> {data.procedureDate}</p>
      <p><strong>Продолжительность:</strong> {data.procedureDuration}</p>
      <p><strong>Врач процедуры:</strong> {data.procedureDoctor}</p>
    </div>
  );
}



export default PrintData;