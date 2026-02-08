**Ahorro Digital - QA Automation Challenge**

Proyecto tecnico para el rol de QA Automation. Incluye frontend en Angular, backend mock en Express y automatizacion con Playwright

**Estructura**
- .../frontend Aplicacion web (Angular)
- .../backend/ API mock (Express)
- .../automation/ Suite de pruebas (Playwright)

**Requisitos**
- Node.js 18+
- Navegador Chromium instalado por Playwright

**Ejecucion local**
-Backend:
cd backend
npm install
npm run dev


-Frontend:
cd frontend
npm install
npm start

-Automatizacion (Playwright)
cd automation
npm install
npx playwright install
npm test


-Reporte HTML:
npm run report

-Evidencias:
Reporte: .../automation/playwright-report
Screenshots y videos: .../automation/test-results

**Configuracion de navegadores**
- Por defecto se ejecuta solo en Chromium
- Si deseas habilitar Firefox/WebKit, edita .../automation/playwright.config.ts en la seccion projects.

### Modo headless
- Cambiar configuracion headless .../automation/playwright.config.ts
- Para ejecutar en modo visible: $env:HEADLESS="false" npm test
- Para volver a headless: $env:HEADLESS="true" npm test


### Capturas y video
- screenshot: admite: off, on, only-on-failure
- video; admite: off, on, retain-on-failure, on-first-retry
- Configuracion actual: screenshot: 'only-on-failure', video: 'retain-on-failure' en 
  automation/playwright.config.ts

## Automatizacion por prioridad
P0:
- Login UI (exitoso e invalido) en automation/tests/e2e/login.spec.ts
- API Login (exitoso e invalido) en automation/tests/api/backend.spec.ts

P1:
- Simulador UI (simulacion exitosa y validaciones) en automation/tests/e2e/simulator.spec.ts
- API Simulador (exitoso y validacion de monto) en automation/tests/api/backend.spec.ts

P2:
- Simulador UI reiniciar en automation/tests/e2e/simulator.spec.ts

Ejecucion por prioridad:
cd .../Ahorro Digital/automation
npm run test:p0
npm run test:p1
npm run test:p2


## Documentacion
- Plan de pruebas: Plan de Pruebas V1.docx
- Casos de prueba: TestSuite.xlsx
- Reporte de bugs: Reporte Bugs.docx

**Resumen**
Este documento explica la estructura general del proyecto y el proposito de cada archivo clave

**Raiz**
- README.md - Resumen del proyecto
- automation - Contiene la automatizacion con Playwright
- backend API - en Node.js con Express
- frontend - Aplicacion Angular

**Backend**
- backend/index.js - Inicializa Express, middlewares, healthcheck y rutas principales.
- backend/config/db.js - Conexion a MongoDB (se puede desactivar con `USE_DB=false`)
- backend/routes/userRoutes.js - Rutas de autenticacion
- backend/routes/simuladorRoutes.js - Ruta del simulador
- backend/controllers/userController.js - Logica de login 
- backend/controllers/simuladorController.js - Logica de simulacion CDT y ahorro
- backend/models/userModel.js - Modelo Mongoose (actualmente vacio)
- backend/models/simuladorModel.js - Modelo Mongoose (actualmente vacio)
- backend/.env - Variables de entorno (URI de DB y bandera `USE_DB`)
- backend/package.json - Dependencias y scripts del backend

**Frontend**
- frontend/ahorroDigital/src/main.ts - Arranque de Angular.
- frontend/ahorroDigital/src/app/app.config.ts - Router y HttpClient
- frontend/ahorroDigital/src/app/app.routes.ts - Login y simulador
- frontend/ahorroDigital/src/app/app.ts - Componente raiz
- frontend/ahorroDigital/src/app/app.html - Vista
- frontend/ahorroDigital/src/app/app.css - Estilos base.
- frontend/ahorroDigital/src/styles.css - Estilos globales
- frontend/ahorroDigital/src/app/core/services/auth.service.ts - Servicio de login hacia el backend.
- frontend/ahorroDigital/src/app/core/services/simulador.service.ts - Servicio del simulador hacia el backend
- frontend/ahorroDigital/src/app/features/login/login.component.* - UI y logica del login
- frontend/ahorroDigital/src/app/features/simulacion/simulacion.component.* - UI y logica del simulador
- frontend/ahorroDigital/package.json - Dependencias y scripts del frontend

**Automation**
- automation/playwright.config.ts - Configuracion de Playwright y ejecucion de test
- automation/package.json - Dependencias y scripts de automatizacion

**Nota sobre mocks**
Actualmente el backend funciona con datos en memoria para facilitar las pruebas. Si se desea usar BD real, se puede implementar userModel y simuladorModel y activar USE_DB=true en .../backend/.env.

**Ejecucion de los desarrollo**
- Backend: **npm run dev** para ejecutar el backend 
- Frontend: **ng -serve -o** para ejecutar el frontend 
- Automatizacion **npm test** para ejecutar test 

**Reportes**
-Ubicacion reporte playwright: ../Ahorro Digital/automation/playwright-report
-Ubicacion Videos y capturas: ../Ahorro Digital/automation/test-results

