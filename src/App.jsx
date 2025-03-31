import React, { useState } from 'react';
import ProtocolSelection from './components/ProtocolSelection';
import ProtocolForm from './components/ProtocolForm';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

/**
 * Главный компонент приложения.
 */
function App() {
  const navigate = useNavigate(); // Хук для навигации
  const [selectedProtocol, setSelectedProtocol] = useState(null);

  /**
   * Обрабатывает выбор протокола.
   * @param {number} protocolId - ID выбранного протокола.
   */
  const handleSelectProtocol = (protocolId) => {
    console.log(`Выбран протокол с ID: ${protocolId}`);
    setSelectedProtocol(protocolId);
    // Переход на страницу формы протокола
    navigate('/protocol-form');
  };

  return (
    <div style={styles.container}>
      <Routes>
        <Route
          path="/"
          element={<ProtocolSelection onSelectProtocol={handleSelectProtocol} />}
        />
        <Route
          path="/protocol-form"
          element={<ProtocolForm />}
        />
      </Routes>
    </div>
  );
}

/**
 * Объект стилей для компонента.
 */
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // Элементы по вертикали
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px', // Расстояние между формой и кнопкой
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  input: {
    padding: '10px',
    margin: '10px 0', // Расстояние между полями ввода
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    maxWidth: '400px', // Ограничение ширины
  },
};

export default App;