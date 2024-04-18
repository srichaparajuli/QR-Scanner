import React, { useState } from "react";
import QRCode from "qrcode.react";
import images from "../../Assets/Images/dhan-03.png";

const QRGenerator = () => {
  const [type, setType] = useState("url");
  const [input, setInput] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");

  const handleChange = (e) => { 
    setInput(e.target.value);
  };

  const handleGenerateQR = () => {
    switch (type) {
      case "url":
        setQrCodeValue(input);
        break;
      case "email":
        setQrCodeValue(`mailto:${input}`);
        break;
      case "wifi":
        setQrCodeValue(`WIFI:T:${encryption};S:${ssid};P:${password};;`);
        break;

      case "whatsapp":
        setQrCodeValue(`https://wa.me/${phoneNumber}`);
        break;
      default:
        break;
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById("qr-code");
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav className="bg-green-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center mb-4">
              <img src={images} alt="BARDALI CREATION" className="h-16" />
            </div>
            <div></div>
          </div>
        </div>
      </nav>
      <div className="bg-green-600 h-44 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-white">
          Welcome to QR Generator
        </h1>
      </div>
      <div className="pt-11 flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Type:
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="url">URL</option>
              <option value="email">Email</option>
              <option value="wifi">WiFi</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          {type !== "wifi" && type !== "whatsapp" && type !== "audio" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {type === "url" ? "URL" : "Email Address"}:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={type === "email" ? "email" : "text"}
                placeholder={`Enter ${
                  type === "url" ? "URL" : "email address"
                }`}
                value={input}
                onChange={handleChange}
              />
            </div>
          )}

          {type === "wifi" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  SSID:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter SSID"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Encryption:
                </label>
                <select
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setEncryption(e.target.value)}
                >
                  <option value="WEP">WEP</option>
                  <option value="WPA">WPA/WPA2</option>
                  <option value="nopass">None (Open)</option>
                </select>
              </div>
            </>
          )}

          {type === "whatsapp" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center justify-center space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleGenerateQR}
            >
              Generate QR Code
            </button>
            {qrCodeValue && (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleDownloadQR}
              >
                Download QR Code
              </button>
            )}
          </div>
          <div className="mt-4">
            {qrCodeValue && (
              <div className="flex items-center justify-center">
                <QRCode id="qr-code" value={qrCodeValue} size={200} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QRGenerator;
