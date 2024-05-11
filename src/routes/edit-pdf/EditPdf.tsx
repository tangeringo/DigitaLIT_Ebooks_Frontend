import React, { useEffect, useState } from 'react';
import { RouteProps } from '../../globalTypes';

import { useDispatch } from 'react-redux';

import { PDFDocument } from 'pdf-lib';
import { editPdfRoute } from '../../variables';
import { setIsCartOpen } from '../../redux/cart/cartActions';

import './editPdf.css'




const PdfEditor: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const dispatch = useDispatch();
    const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);

    const loadPdf = async () => {
        try {
            const url = 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf';
            const response = await fetch(url);
            const pdfData = await response.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfData);
            const pdfBytes = await pdfDoc.save();
            setPdfBytes(pdfBytes);
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    };

    useEffect(() => {
        loadPdf()
    }, [])


    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(editPdfRoute);
    }, [dispatch, setRoute]);

    return (
        <div style={{marginTop: "4.5%"}}>
            {pdfBytes && (
                <iframe
                    id="pdf"
                    style={{width: "100%", height: "88vh"}}
                    src={`data:application/pdf;base64,${btoa(
                        new Uint8Array(pdfBytes).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    )}`}
                    title="PDF"
                />
            )}
        </div>
    );
}

export default PdfEditor;

