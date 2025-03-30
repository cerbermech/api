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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fa',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '28px',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center',
  },
  buttonsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 колонки
    gap: '20px',
    justifyItems: 'center',
  },
  button: {
    padding: '20px 40px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    width: '100%',
    maxWidth: '250px',
  },
  '@media (max-width: 768px)': {
    title: {
      fontSize: '22px',
    },
    button: {
      padding: '15px 30px',
      fontSize: '16px',
    },
    buttonsContainer: {
      gridTemplateColumns: '1fr', // 1 колонка на маленьких экранах
    },
  },
};

export default ProtocolSelection;