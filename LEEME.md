# AquaControl (Angular) - Front

## Requisitos
- Node.js LTS (22.x) y npm
- VS Code + extensión "Angular Language Service"

## Arrancar
    npm install
    npx ng serve -o        (http://localhost:4200)

Usuarios de prueba (contraseña = nombre de usuario): admin / empleado

## Estructura (según la libreta: vista · controlador · componente)
    src/app/
      vistas/          VISTA: una carpeta por pantalla (.html + .scss + .ts)
        login/  inicio/  inventario/  ventas/  encargos/  contactos/  reportes/  usuarios/  backup/
        <pantalla>/<nombre>-dialogo/   ventanas flotantes de esa pantalla
      componentes/     COMPONENTE: piezas reutilizables
        dialogo/ (marco de TODAS las ventanas flotantes: título y X fijos)
        menu-lateral/  encabezado-pagina/  acciones-fila/  grafica/
      controladores/   CONTROLADOR: datos y sesión (hoy en memoria; luego llamadas a la API Java)
        store.ts  auth.ts
      modelos/         interfaces de datos
      util/            pdf.ts (ticket y reportes), imagen.ts
    public/img/        logo1.png (login) · logo2.png (menú y ticket) · nivel.png + nivel-mascara.png (tanque) · nivel-inicio.png (login)
