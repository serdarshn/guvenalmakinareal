import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Worker URL'sini ayarlayalım
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFThumbnailProps {
  pdfUrl: string;
}

export default function PDFThumbnail({ pdfUrl }: PDFThumbnailProps) {
  const [error, setError] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Document
        file={pdfUrl}
        onLoadError={() => setError(true)}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Page
          pageNumber={1}
          width={400}
          height={300}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading={
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        />
      </Document>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
} 