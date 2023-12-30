import React, { useState } from 'react';
import axios from 'axios';

const QRCodeGenerator: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCodeImage, setQRCodeImage] = useState<string | null>(null);

  const generateQRCode = async () => {
    setLoading(true);
    setQRCodeImage(null);
    try {
      const response = await axios.post('https://qr-code-generator-api-9m6c.onrender.com/generate-qrcode', { data });
      setQRCodeImage(response.data.qrCodeImage);
      setLoading(false);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeImage) {
      const link = document.createElement('a');
      link.href = qrCodeImage;
      link.download = `${data}-qrcode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data for QR code"
        className="border border-gray-300 p-2 mb-4 text-black"
      />
      <button onClick={generateQRCode} className="bg-blue-500 text-white px-4 py-2">
        Generate QR Code
      </button>
      {loading && <p>Generating QR Code...</p>}
      {qrCodeImage && (
        <div className="mt-4">
          <img src={qrCodeImage} alt="QR Code" />
          <button onClick={downloadQRCode} className="mt-2 bg-green-500 text-white px-4 py-2">
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
