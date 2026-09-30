# Release v0.1.0

Primera versión del paquete.

Este es un módulo independiente enfocado puramente en la extracción de información y descarga de medios desde YouTube utilizando `yt-dlp`.

### Incluye

- **Arquitectura desacoplada**: Separación del núcleo de extracción para formar parte del nuevo ecosistema `@yt-dlx`.
- **Ejecución vía `spawn`**: Integración con `yt-dlp` mediante procesos hijo optimizados con la bandera `--newline` para transmisión continua de eventos de progreso.
- **`YtEngine`**: Implementación de los adaptadores principales `MediaInspector` y `MediaDownloader` para inspección de metadata y gestión de descargas.
- **Tipado estático completo**: Definiciones de TypeScript empaquetadas en un único archivo comprimido (`index.d.ts`).
- **Build liviano**: Empaquetado minificado utilizando Bun sin dependencias por parte de `node_modules`.

### yt-kit

- Esta versión reemplaza la antigua arquitectura monolítica de `@yt-kit/core`. Si venís de `yt-kit`, las importaciones cambian al scope `@yt-dlx/yt` y la API cambia casi completamente. (No voy a hacer manual para migración, `yt-kit` no lo usaba ni el tato).

### Notas

- Se requiere tener `yt-dlp` disponible en el `PATH` del sistema para el correcto funcionamiento del motor de descarga.