// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Pagina no encontrada</h1>
      <p className="mt-4">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link href="/">
        <p className="mt-6 text-blue-600 hover:underline">Volver al inicio</p>
      </Link>
    </div>
  );
}
