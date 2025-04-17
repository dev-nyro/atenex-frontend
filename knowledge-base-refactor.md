# Refactorización Vista Knowledge

## Checklist Refactorización Knowledge

- [x] 1. Auditar llamadas API en `knowledge/page.tsx` y corregir URL (404 HTML → JSON).
- [x] 2. Añadir en `lib/api.ts` funciones: `getDocumentStatuses`, `retryDocument`, `uploadDocument`.
- [x] 3. Definir interfaces TypeScript para `DocumentStatus` y respuestas de API.
- [x] 4. Crear hook `useDocumentStatuses` con paginación o scroll infinito.
- [ ] 5. Crear hook `useUploadDocument` que capture y muestre errores 409 (duplicados).
- [ ] 6. Refactorizar/crear componente `DocumentStatusTable`:
  - Columnas: nombre de archivo, estado (badge), número de chunks, fecha última actualización, mensaje de error.
  - Botón “Reintentar” para los documentos en estado `error`.
- [ ] 7. Integrar uploader de archivos en la misma vista (formulario o modal) usando `file-uploader.tsx`.
- [ ] 8. Manejo de estado global de carga y notificaciones de error/éxito (toasts con `sonner`).
- [ ] 9. Asegurar estilos responsivos y soporte dark/light mode.
- [ ] 10. Añadir tests unitarios para hooks y componentes (Jest + React Testing Library).
- [ ] 11. Prueba manual con dataset grande (cientos de documentos): paginación o scroll infinito.
- [ ] 12. Revisar prevención de duplicados: simular error 409 y mostrar mensaje claro.
- [ ] 13. Documentar cambios en README y en los componentes relevantes.
- [ ] 14. Crear PR, solicitar revisión de equipo y desplegar en staging.
- [ ] 15. Validación final en producción y cierre de tareas.
