# Refactorización Vista Knowledge

## Checklist Refactorización Knowledge

- [x] 1. Auditar llamadas API en `knowledge/page.tsx` y corregir URL (404 HTML → JSON).
- [x] 2. Añadir en `lib/api.ts` funciones: `getDocumentStatuses`, `retryDocument`, `uploadDocument`.
- [x] 3. Definir interfaces TypeScript para `DocumentStatus` y respuestas de API.
- [x] 4. Crear hook `useDocumentStatuses` con paginación o scroll infinito. (Creado sin paginación por ahora)
- [x] 5. Crear hook `useUploadDocument` que capture y muestre errores 409 (duplicados).
- [x] 6. Refactorizar/crear componente `DocumentStatusTable`:
  - [x] Columnas: nombre de archivo, estado (badge), número de chunks, fecha última actualización, mensaje de error.
  - [x] Botón “Reintentar” para los documentos en estado `error`.
- [x] 7. Integrar uploader de archivos en la misma vista (formulario o modal) usando `file-uploader.tsx`.
- [x] 8. Manejo de estado global de carga y notificaciones de error/éxito (toasts con `sonner`). (Integrado en hooks y page)
- [x] 9. Asegurar estilos responsivos y soporte dark/light mode. (Revisado, parece correcto con Shadcn/Tailwind)
- [ ] 10. Añadir tests unitarios para hooks y componentes (Jest + React Testing Library).
- [ ] 11. Prueba manual con dataset grande (cientos de documentos): paginación o scroll infinito.
- [x] 12. Revisar prevención de duplicados: simular error 409 y mostrar mensaje claro. (Manejo en hook implementado)
- [ ] 13. Documentar cambios en README y en los componentes relevantes.
- [ ] 14. Crear PR, solicitar revisión de equipo y desplegar en staging.
- [ ] 15. Validación final en producción y cierre de tareas.