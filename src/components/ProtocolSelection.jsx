import React from 'react';

/**
 * Компонент для выбора протокола.
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.onSelectProtocol - Функция обратного вызова, вызываемая при выборе протокола.
 */
const ProtocolSelection = ({ onSelectProtocol }) => {
  /**
   * Список доступных протоколов.
   */
  const protocols = [
    { name: 'Протокол А', id: 1 },
    { name: 'Протокол Б', id: 2 },
    { name: 'Протокол В', id: 3 },
    { name: 'Протокол Г', id: 4 },
    { name: 'Протокол Д', id: 5 },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Выберите протокол</h1>
      <div style={styles.buttonsContainer}>
        {protocols.map((protocol) => (
          <button
            key={protocol.id}
            onClick={() => onSelectProtocol(protocol.id)}
            style={styles.button}
          >
            {protocol.name}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Объект стилей для компонента.
 */
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default ProtocolSelection;