import QRCode from 'qrcode.react';
import logoImage from './logo.png'; // Подставьте путь к вашей картинке

const RoundedQRCode = () => {
  const qrConfig = {
    value: 'https://example.com',
    size: 256,
    bgColor: '#FFFFFF',
    fgColor: '#000000', 
    level: 'H',
    renderAs: "svg",
  };

  const qrContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: qrConfig.bgColor,
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={{ qrContainerStyles }}>
      <QRCode
        value={qrConfig.value}
        size={qrConfig.size}
        bgColor={qrConfig.bgColor}
        fgColor={qrConfig.fgColor}
        level={qrConfig.level}
        renderAs={qrConfig.renderAs}
        logoImage={logoImage} // Картинка для вставки в центр QR-кода
        logoWidth={64} // Ширина картинки
        logoHeight={64} // Высота картинки
      />
      <p style={{ marginTop: '10px', fontSize: '18px', color: '#333' }}>
        Scan the QR code
      </p>
    </div>
  );
};

export default RoundedQRCode;