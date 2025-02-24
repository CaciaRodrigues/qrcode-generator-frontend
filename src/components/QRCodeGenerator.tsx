import { useState } from 'react';

interface QRCodeResponse {
    qr_code?: string;
}

export default function QRCodeGenerator() {
    const [text, setText] = useState<string>('');
    const [qrCode, setQRCode] = useState<string>('');

    const generateQRCode = async () => {
        const backendURL = process.env.REACT_APP_BACKEND_URL;  // Pegando a variável de ambiente
        try {
            const response = await fetch(`${backendURL}/generate_qr`, {  // Incluindo o endpoint correto
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
    
            // Verificar se a resposta é bem-sucedida (código 200)
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
        <div className="flex items-center justify-center h-screen bg-dark-color p-3">
            <div className="w-2/5 h-1/2 bg-mid-lit-color shadow-lg rounded-2xl overflow-hidden">
                {/* Título */}
                <div className="text-center p-2 border-b border-mid-color">
                    <h1 className="text-2xl font-bold text-gray-50">QR Code Generator</h1>
                </div>

                <div className="grid grid-cols-2 gap-4 h-full bg-light-color">
                    {/* Esquerda - Input e Botão */}
                    <div className="flex flex-col justify-center items-center space-y-6 px-5 h-full">
                        <input
                            className="w-full max-w-md border border-mid-color p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type your text here"
                        />
                        <button 
                            className="w-full max-w-md bg-pop-color text-gray-50 p-3 rounded-lg hover:bg-dark-pop-color transition-all"
                            onClick={generateQRCode}
                        >
                            Generate QR Code
                        </button>
                    </div>

                    {/* Direita - QR Code */}
                    <div className="flex items-center justify-center text-center bg-mid-color p-6 h-full">
                        {qrCode ? (
                            <div className="flex flex-col items-center">
                                <img src={qrCode} alt="QR Code" className="w-3/4 h-3/4 object-contain" />
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
