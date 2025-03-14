import { useState } from 'react';

interface QRCodeResponse {
    qr_code?: string;
}

export default function QRCodeGenerator() {
    const [text, setText] = useState<string>('');
    const [qrCode, setQRCode] = useState<string>('');

    const generateQRCode = async () => {
        
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://qrcode-generator-c4t1.onrender.com';

        try {
            const response = await fetch(`${backendURL}/generate_qr`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                console.error('Failed to fetch QR code:', response.statusText);
                return;
            }

            const data: QRCodeResponse = await response.json();

            if (data.qr_code) {
                setQRCode(`data:image/png;base64,${data.qr_code}`);
            } else {
                console.log('QR code not received');
            }
        } catch (error) {
            console.error('Error during QR code generation:', error);
        }
    };

    return (
        <div className="w-full h-screen bg-dark-color p-0 flex">
            <div className="w-full h-full sm:w-2/5 sm:h-1/2 bg-mid-lit-color shadow-lg sm:rounded-2xl overflow-hidden sm:m-auto">
                {/* Título */}
                <div className="text-center p-2 border-b border-mid-color">
                    <h1 className="text-2xl font-bold text-gray-50">QR Code Generator</h1>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-2 h-full">
                    {/* Input e Botão */}
                    <div className="flex flex-col justify-center items-center space-y-4 px-5 py-4 sm:space-y-6 sm:px-5 sm:h-full sm:border-r border-mid-color h-[40%] sm:w-full">
                        <input
                            className="w-full max-w-md border border-mid-color p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type your text here"
                            maxLength={300}
                        />
                        <button
                            className={`w-full max-w-md p-3 rounded-lg transition-all ${text ? 'bg-pop-color text-gray-50 hover:bg-dark-pop-color' : 'bg-gray-400 cursor-not-allowed'}`}
                            onClick={generateQRCode}
                            disabled={!text}
                        >
                            Generate QR Code
                        </button>
                    </div>

                    {/* QR Code */}
                    <div className="flex items-center justify-center text-center bg-mid-color p-6 h-[60%] sm:h-full">
                        {qrCode ? (
                            <div className="flex flex-col items-center">
                                <img src={qrCode} alt="QR Code" className="w-48 h-48 object-contain" />
                                <a
                                    href={qrCode}
                                    download="qr-code.png"
                                    className="mt-4 bg-pop-color text-gray-50 p-3 rounded-lg hover:bg-dark-pop-color transition-all"
                                >
                                    Save QR Code
                                </a>
                            </div>
                        ) : (
                            <div className="text-lighter-color">Image generates here</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
