// app/components/Map.tsx
'use client';

import dynamic from 'next/dynamic';

// Carga dinámica del mapa para evitar errores de SSR (Server-Side Rendering)
const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>,
});

export default function Map() {
  return <DynamicMap />;
}