# Proyecto de Scraping y Almacenamiento de Datos

Este proyecto utiliza Puppeteer para hacer scraping de datos de precios y productos de un sitio web, y almacena los datos extraídos en una base de datos PostgreSQL utilizando Prisma.

## Instalación

1. **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. **Instalar dependencias:**

    Navega al directorio del proyecto y ejecuta:

    ```bash
    npm install
    ```

3. **Configurar variables de entorno:**

    Crea un archivo `.env` en el directorio raíz del proyecto y añade las siguientes variables:

    ```env
    URL=https://www.mercadolibre.com.ar
    SEARCH=<tu-producto-a-buscar>
    DATABASE_URL=postgres://<user>:<password>@localhost:5432/<base-de-datos>
    ```

## Configuración de Prisma

1. **Actualizar el archivo `schema.prisma`:**

    El archivo `schema.prisma` está ubicado en el directorio `prisma`. Asegúrate de que el modelo para `Producto` esté configurado de la siguiente manera para manejar precios con precisión de 3 decimales:

    ```prisma
    model Producto {
        id       Int     @id @default(autoincrement())
        titulo   String
        precio   Decimal @db.Decimal(10, 3) // Precisión 10, escala 3 (dígitos totales, lugares decimales)
        envio    String?
        link     String?
        imagen   String?
    }
    ```

2. **Generar y aplicar migraciones:**

    Ejecuta el siguiente comando para generar una nueva migración y aplicarla a la base de datos:

    ```bash
    npx prisma migrate dev --name update-producto-schema
    ```

    Esto actualizará la base de datos para reflejar los cambios en el esquema.

3. **Regenerar el cliente Prisma:**

    Después de aplicar la migración, es recomendable regenerar el cliente Prisma para asegurarte de que esté sincronizado con el nuevo esquema:

    ```bash
    npx prisma generate
    ```

## Uso

1. **Ejecutar el script de scraping:**

    Una vez configurado, puedes ejecutar el script de scraping para extraer datos y almacenarlos en la base de datos:

    ```bash
    node index.js
    ```

2. **Detalles del scraping:**

    El script realiza lo siguiente:
    
    - Navega al sitio web especificado.
    - Realiza una búsqueda utilizando el término definido en la variable de entorno `SEARCH`.
    - Extrae datos de los productos, incluyendo título, precio, información de envío, enlace e imagen.
    - Convierte los precios extraídos a formato decimal con precisión de 3 decimales.
    - Almacena los datos en la base de datos PostgreSQL.

## Notas

- **Precisión de precios:** Los precios se almacenan en la base de datos con una precisión de 3 decimales. Asegúrate de que los precios extraídos del sitio web se formateen correctamente antes de almacenarlos.

- **Errores comunes:** Si encuentras problemas con los datos de precios, verifica que el formato de los precios extraídos esté correctamente gestionado por el script.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request si encuentras algún problema o deseas mejorar el proyecto.
