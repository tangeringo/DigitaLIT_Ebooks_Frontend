import React, { useEffect, useState } from 'react';
import { RouteProps } from '../../globalTypes';
import { useDispatch } from 'react-redux';
import { PDFDocument } from 'pdf-lib';
import { editPdfRoute } from '../../variables';
import { setIsCartOpen } from '../../redux/cart/cartActions';
import './editPdf.css';


const PdfEditor: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const dispatch = useDispatch();
    const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);

    const loadPdf = async () => {
        // Load a PDF document from a URL
        const url = "https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf";
        const response = await fetch(url);
        const existingPdfBytes = await response.arrayBuffer();

        // Manipulate the PDF document
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Save the modified PDF to a new buffer
        const modifiedPdfBytes = await pdfDoc.save();

        // Update state to trigger re-render with modified PDF
        setPdfBytes(modifiedPdfBytes as Uint8Array);
    };

    const savePdf = async () => {
        if (pdfBytes) {
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'modified_pdf.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    };

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(editPdfRoute);
    }, [dispatch, setRoute]);

    return (
        <div style={{ marginTop: '10%' }}>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={loadPdf}>Load PDF</button>
                {/* <button onClick={savePdf}>Save PDF</button> */}
            </div>
        </div>
    );
}

export default PdfEditor;
