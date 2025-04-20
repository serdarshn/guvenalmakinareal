'use client';

import { useState } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { zoomPlugin } from '@react-pdf-viewer/zoom';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [error] = useState<string | null>(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();

  const renderError = () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-gray-700 mb-4">PDF dosyası yüklenirken bir hata oluştu.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );

  const renderLoader = () => (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-text font-medium">PDF Yükleniyor...</span>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-white">
      {error ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      ) : (
        <Worker workerUrl="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="h-full">
            <Viewer
              fileUrl={pdfUrl}
              plugins={[
                defaultLayoutPluginInstance,
                pageNavigationPluginInstance,
                zoomPluginInstance,
              ]}
              defaultScale={SpecialZoomLevel.PageFit}
              renderError={renderError}
              renderLoader={renderLoader}
            />
          </div>
        </Worker>
      )}
    </div>
  );
} 