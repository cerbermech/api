import React, { useState } from 'react';
import ProtocolSelection from './components/ProtocolSelection';
import ProtocolForm from './components/ProtocolForm';

/**
 * Главный компонент приложения.
 */
function App() {
  /**
   * Состояние для хранения выбранного протокола.
   * Если значение равно null, отображается страница выбора протокола.
   */
  const [selectedProtocol, setSelectedProtocol] = useState(null);

  /**
   * Обрабатывает выбор протокола.
   * @param {number} protocolId - ID выбранного протокола.
   */
  const handleSelectProtocol = (protocolId) => {
    console.log(`Выбран протокол с ID: ${protocolId}`);
    setSelectedProtocol(protocolId);
  };

  return (
    <div style={styles.container}>
      {!selectedProtocol ? (
        <ProtocolSelection onSelectProtocol={handleSelectProtocol} />
      ) : (
        <ProtocolForm />
      )}
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
  },
};

export default App;