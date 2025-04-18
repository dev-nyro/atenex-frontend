## Plan de Refactorización de UI/UX para Atenex Frontend

Este plan detalla los pasos para modernizar la interfaz de usuario y mejorar la experiencia de usuario de la aplicación Atenex Frontend. El objetivo es lograr un diseño más limpio, profesional y eficiente, adecuado para un SaaS B2B, sin alterar la funcionalidad principal.

**Principios Generales a Aplicar:**

*   **Consistencia:** Asegurar que los estilos (colores, tipografía, espaciado, bordes, sombras) sean coherentes en toda la aplicación.
*   **Claridad Visual:** Mejorar la jerarquía de la información, usar el espacio en blanco de manera efectiva y reducir el desorden visual.
*   **Profesionalismo:** Utilizar una paleta de colores refinada (ajustar los temas existentes si es necesario), tipografía legible y animaciones sutiles y significativas.
*   **Eficiencia:** Optimizar los flujos de usuario dentro de lo posible a través del diseño (mejor navegación, feedback claro).
*   **Adaptabilidad:** Asegurar que los nuevos diseños sean responsivos y funcionen bien en diferentes tamaños de pantalla.

**Checklist de Refactorización:**

### Iteración 1: Estructura Principal y Layout del Dashboard

*   **Objetivo:** Replantear la disposición general del layout autenticado para optimizar el espacio y mejorar la navegación, especialmente abordando la sección apretada del historial de chats.
*   **Pasos:**
    1.  **[X] Revisar y Refactorizar `app/(app)/layout.tsx`:**
        *   [X] Considerar una estructura de 3 columnas para el `ResizablePanelGroup` si se decide separar el historial de chats: `Sidebar Navegación | Panel Historial Chats | Panel Contenido Principal`. (Se mantuvo 2 columnas por ahora)
        *   [X] *Alternativa:* Mantener 2 columnas pero mejorar significativamente cómo se integra `ChatHistory` dentro de la `Sidebar`. (Realizado)
        *   [X] Ajustar `defaultSize`, `minSize`, `maxSize` de los `ResizablePanel` para un estado inicial más equilibrado. (Realizado)
        *   [X] Mejorar visualmente el `ResizableHandle` para que sea más sutil pero claro (modificar `components/ui/resizable.tsx` si es necesario, o aplicar clases CSS directamente). (Realizado)
        *   **Archivos:** `app/(app)/layout.tsx`, `components/ui/resizable.tsx`.
    2.  **[X] Rediseñar `components/layout/sidebar.tsx`:**
        *   **Navegación Principal:**
            *   [X] Mejorar el estilo de los ítems de navegación (padding, iconos, tipografía). (Realizado)
            *   [X] Refinar el indicador visual del ítem activo (quizás un borde izquierdo más prominente o un fondo más distintivo pero sutil). (Realizado)
            *   [X] Ajustar el espaciado general dentro de la barra lateral. (Realizado)
            *   [X] Mejorar la apariencia en estado colapsado (`isCollapsed={true}`), asegurando que los iconos estén bien centrados y el tooltip sea claro. (Realizado)
        *   **Botón "Nuevo Chat":**
            *   [X] Revisar su prominencia y estilo. Quizás integrarlo de forma más elegante o darle un estilo más acorde al look empresarial. (Realizado)
            *   [X] Asegurar que funcione bien tanto en estado expandido como colapsado. (Realizado)
        *   **Integración del Historial (si no se separa en 3 columnas):** Preparar el espacio donde se integrará el `ChatHistory` rediseñado (ver Iteración 2). (Realizado)
        *   **Archivos:** `components/layout/sidebar.tsx`, `app/globals.css` (para posibles variables de color/estilo del sidebar).
    3.  **[X] Refinar `components/layout/header.tsx`:**
        *   [X] Ajustar el espaciado y alineación de los iconos de la derecha (Palette, Help, User Menu) para que se sientan más cohesionados. (Realizado)
        *   [X] Revisar el estilo del `DropdownMenu` del usuario para coherencia con el nuevo diseño. (Realizado)
        *   **Archivos:** `components/layout/header.tsx`.

### Iteración 2: Rediseño del Historial de Chats

*   **Objetivo:** Solucionar el problema del historial de chats apretado y darle una apariencia más profesional y útil.
*   **Pasos:**
    1.  **[X] Rediseñar `components/chat/chat-history.tsx`:**
        *   **Diseño de Items:**
            *   [X] Aumentar el espaciado vertical y padding interno de cada item de chat. (Realizado)
            *   [X] Mejorar la jerarquía visual: Título del chat más prominente, fecha/hora más sutil. (Realizado)
            *   [X] Considerar añadir un pequeño fragmento del último mensaje (si la API lo proveyera o si se pudiera inferir, aunque esto roza la lógica). *Alternativa:* Mejorar solo el diseño visual. (Mejorado diseño visual)
            *   [X] Refinar el estado `:hover` y `:active` / `:focus`. (Realizado)
            *   [X] Mejorar la interacción y visibilidad del botón de eliminar (quizás hacerlo visible solo al pasar el ratón). (Realizado)
        *   **Contenedor:**
            *   [X] Si se integra en el sidebar (layout de 2 columnas), asegurar que use el espacio vertical de forma eficiente con `ScrollArea`. (Realizado)
            *   [X] Si se convierte en un panel propio (layout de 3 columnas), darle un header claro y asegurar que sea redimensionable. (N/A - Se mantuvo en Sidebar)
        *   **Estados (Carga, Error, Vacío):**
            *   [X] Mejorar la presentación visual de estos estados para que sean más claros y estéticamente agradables. (Realizado)
            *   [X] Usar `Skeleton` de forma más representativa. (Realizado)
        *   **Archivos:** `components/chat/chat-history.tsx`, `components/ui/skeleton.tsx` (si se necesita customización), `app/globals.css`.

### Iteración 3: Refactorización de la Interfaz de Chat Principal

*   **Objetivo:** Modernizar el área de conversación, mejorar la legibilidad y la presentación de la información (mensajes y fuentes).
*   **Pasos:**
    1.  **[X] Refinar `app/(app)/chat/[[...chatId]]/page.tsx`:**
        *   **Layout Interno:**
            *   [X] Ajustar el padding y espaciado dentro del `ScrollArea` del chat para evitar que los mensajes se peguen a los bordes. (Realizado)
            *   [X] Mejorar el estado inicial o vacío del chat (cuando no hay mensajes o solo el de bienvenida). (Realizado, muestra bienvenida)
            *   [X] Optimizar el uso del espacio vertical. (Realizado con ScrollArea)
            *   [X] Revisar la posición y estilo del botón para mostrar/ocultar el panel de fuentes (`PanelRightOpen`/`PanelRightClose`). Hacerlo más intuitivo. (Realizado)
        *   **Indicador de Carga:**
            *   [X] Mejorar el indicador "Atenex está pensando..." (`BrainCircuit`). Hacerlo más integrado visualmente o usar un `Skeleton` más elaborado para el mensaje entrante. (Realizado, se usa Skeleton)
        *   **Archivos:** `app/(app)/chat/[[...chatId]]/page.tsx`.
    2.  **[X] Rediseñar `components/chat/chat-message.tsx`:**
        *   **Estilo de Burbujas:**
            *   [X] Refinar el padding, `border-radius`, y sombras para un look más pulido. (Realizado)
            *   [X] Asegurar un buen contraste entre el fondo de la burbuja y el texto, en todos los temas. (Realizado)
            *   [X] Mejorar la separación visual entre mensajes consecutivos. (Realizado a través de `space-y` en page.tsx)
        *   **Contenido:**
            *   [X] Asegurar que el `Markdown` se renderice correctamente y con estilos consistentes (listas, código, negritas, etc.). Ajustar estilos `prose` en `tailwind.config.js` si es necesario. (Realizado)
            *   [X] Mejorar la presentación de las `fuentes` dentro del mensaje del asistente. Quizás usar badges más refinados o una lista más estructurada. Hacer el tooltip más informativo y estilizado (`components/ui/tooltip.tsx`). (Realizado, se usan Badges y Tooltip mejorado)
        *   **Avatares:** Asegurar que los avatares (Usuario y Asistente) estén bien alineados y tengan un estilo consistente. (Realizado)
        *   **Mensajes de Error:** Asegurar que los mensajes de error sean claramente distinguibles pero sin ser visualmente discordantes. (Realizado)
        *   **Archivos:** `components/chat/chat-message.tsx`, `tailwind.config.js` (para `prose`), `components/ui/tooltip.tsx`, `app/globals.css`.
    3.  **[X] Rediseñar `components/chat/retrieved-documents-panel.tsx`:**
        *   **Diseño de Tarjetas:**
            *   [X] Mejorar el diseño de cada tarjeta de documento fuente. Mostrar información clave (nombre archivo, score, preview) de forma más clara y organizada. (Realizado)
            *   [X] Añadir mejores indicadores visuales para interactividad (hover states). (Realizado)
            *   [X] Refinar el uso de `Badge` para el score. (Realizado)
        *   **Panel General:**
            *   [X] Asegurar buen padding y espaciado dentro del panel. (Realizado)
            *   [X] Mejorar el estado de carga (`Skeleton`) y el estado vacío ("No se encontraron documentos..."). (Realizado)
        *   **Modal/Dialog de Detalles:** Revisar y pulir el estilo del `Dialog` que muestra los detalles del documento. (Realizado)
        *   **Archivos:** `components/chat/retrieved-documents-panel.tsx`, `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/dialog.tsx`, `components/ui/skeleton.tsx`.
    4.  **[X] Refinar `components/chat/chat-input.tsx`:**
        *   [X] Ajustar el estilo del `Textarea` y el `Button` para que coincidan con el nuevo diseño (bordes, sombras, colores). (Realizado)
        *   [X] Mejorar el feedback visual cuando está `isLoading`. (Realizado)
        *   **Archivos:** `components/chat/chat-input.tsx`, `components/ui/textarea.tsx`, `components/ui/button.tsx`.

### Iteración 4: Mejora de Páginas de Gestión (Knowledge Base, Settings)

*   **Objetivo:** Aplicar el nuevo estilo empresarial a las páginas de gestión, mejorando la presentación de formularios y tablas.
*   **Pasos:**
    1.  **[X] Refactorizar `app/(app)/knowledge/page.tsx`:**
        *   **Layout y Cards:**
            *   [X] Organizar mejor el contenido usando `Card`s con cabeceras (`CardHeader`) y contenido (`CardContent`) bien definidos. (Realizado)
            *   [X] Mejorar el espaciado general de la página. (Realizado)
        *   **File Uploader (`components/knowledge/file-uploader.tsx`):**
            *   [X] Mejorar el diseño visual del área de dropzone (hacerlo menos 'dashed' si no encaja, usar iconos y texto más claros). (Realizado)
            *   [X] Mejorar el feedback visual durante la carga y al mostrar errores. (Realizado)
            *   [X] Pulir el estilo del archivo seleccionado y el botón de subida. (Realizado)
        *   **Lista de Documentos (`components/knowledge/document-status-list.tsx`):**
            *   [X] Refinar el estilo de la `Table` (bordes, hover states, padding de celdas). (Realizado)
            *   [X] Mejorar la apariencia de los `Badge` de estado (colores, iconos) para máxima claridad y consistencia con el tema. (Realizado)
            *   [X] Asegurar que las acciones (Retry, Refresh, Delete) sean claras, accesibles y con tooltips informativos. Usar iconos consistentes. (Realizado)
            *   [X] Mejorar el estilo del `AlertDialog` de confirmación de borrado. (Realizado)
            *   [X] Mejorar estado vacío. (Realizado)
        *   **Archivos:** `app/(app)/knowledge/page.tsx`, `components/knowledge/file-uploader.tsx`, `components/knowledge/document-status-list.tsx`, `components/ui/card.tsx`, `components/ui/table.tsx`, `components/ui/badge.tsx`, `components/ui/button.tsx`, `components/ui/tooltip.tsx`, `components/ui/alert-dialog.tsx`.
    2.  **[X] Refactorizar `app/(app)/settings/page.tsx`:**
        *   **Layout y Cards:**
            *   [X] Utilizar `Card`s de forma efectiva para separar las secciones (Perfil, Empresa). (Realizado)
        *   **Formularios:**
            *   [X] Mejorar la disposición de los `Label` e `Input`. (Realizado con grid)
            *   [X] Asegurar que los estados `disabled` y los mensajes informativos (como "El correo no se puede cambiar") sean claros y estén bien estilizados. (Realizado)
            *   [X] Pulir el estilo del botón "Guardar Cambios" y su estado de carga/deshabilitado. (Realizado con feedback visual)
        *   **Archivos:** `app/(app)/settings/page.tsx`, `components/ui/card.tsx`, `components/ui/label.tsx`, `components/ui/input.tsx`, `components/ui/button.tsx`.

### Iteración 5: Pulido de Páginas Públicas y Autenticación

*   **Objetivo:** Asegurar que las páginas públicas y el flujo de autenticación sean coherentes con el nuevo estilo visual.
*   **Pasos:**
    1.  **[X] Refinar `app/page.tsx` (Landing Page):**
        *   [X] Evaluar si el diseño actual encaja o necesita una modernización (quizás una imagen/ilustración más corporativa, testimonios, etc., aunque esto puede exceder el "solo UI"). (Se pulió el diseño actual)
        *   [X] Pulir el `Header` y `Footer` específicos de esta página si los tiene (parece usar uno global ahora). (Realizado)
        *   [X] Refinar el estilo de las `FeatureCard`s (iconos, texto, fondo, borde, hover). (Realizado)
        *   [X] Asegurar consistencia en botones y tipografía. (Realizado)
        *   **Archivos:** `app/page.tsx`.
    2.  **[X] Refinar `app/about/page.tsx`, `app/contact/page.tsx`, `app/help/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`:**
        *   [X] Aplicar estilos consistentes de `Card`, tipografía (`prose` si aplica), títulos y espaciado. (Realizado)
        *   [X] Asegurar que los elementos interactivos (links, botones) sigan el nuevo diseño. (Realizado)
        *   [X] Mejorar la presentación visual en `About` (equipo, misión) y `Contact` (formulario, información de contacto). (Realizado)
        *   **Archivos:** `app/about/page.tsx`, `app/contact/page.tsx`, `app/help/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`.
    3.  **[X] Refinar `app/(auth)/layout.tsx` y `app/(auth)/login/page.tsx`:**
        *   [X] Asegurar que el layout de autenticación sea limpio y profesional. (Realizado)
        *   [X] Pulir el estilo de la `Card` de login y el `LoginForm`. (Realizado)
        *   [X] Verificar consistencia de botones, inputs y mensajes de error con el resto de la aplicación. (Realizado)
        *   **Archivos:** `app/(auth)/layout.tsx`, `app/(auth)/login/page.tsx`, `components/auth/login-form.tsx`.

### Iteración 6: Revisión General y Temas

*   **Objetivo:** Realizar una revisión final de consistencia, responsividad y pulir los detalles en todos los temas.
*   **Pasos:**
    1.  **[ ] Revisar la Consistencia General:** Navegar por toda la aplicación verificando que los estilos de componentes comunes (botones, inputs, cards, badges, tooltips, dialogs, etc.) sean coherentes.
    2.  **[ ] Revisar Responsividad:** Probar la aplicación en diferentes tamaños de pantalla (móvil, tablet, escritorio) y ajustar estilos donde sea necesario para asegurar una buena experiencia en todos los dispositivos.
    3.  **[ ] Revisar y Ajustar Temas (`globals.css`):**
        *   [ ] Verificar que los temas existentes (light, dark, blue, green) se apliquen correctamente y de manera profesional en todos los componentes rediseñados.
        *   [ ] Ajustar las variables de color (`--primary`, `--secondary`, `--muted`, etc.) si es necesario para lograr un look más "empresarial" (quizás colores menos saturados o una paleta más sobria para el tema por defecto/system).
        *   [ ] Prestar especial atención a los contrastes para la accesibilidad.
        *   **Archivos:** `app/globals.css`, `tailwind.config.js` (si se ajustan variables o plugins).
    4.  **[ ] Micro-interacciones y Animaciones:** Añadir transiciones sutiles (`transition-colors`, `duration-150`, etc.) en hovers, focus, etc., para una sensación más pulida. Evitar animaciones excesivas. Usar `tailwindcss-animate` de forma consistente.
    5.  **[ ] Limpieza Final:** Eliminar clases CSS no utilizadas o redundantes. Asegurar que el código siga las buenas prácticas de Tailwind/shadcn.