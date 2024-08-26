# Scraper de Mercado Libre con Puppeteer

Este proyecto es un scraper de precios para Mercado Libre, utilizando Puppeteer para automatizar la navegación web y extraer información de productos. Los datos extraídos se guardan en un archivo CSV.

## Descripción

El script navega por Mercado Libre, realiza una búsqueda basada en un término definido en el archivo `.env`, extrae información sobre los productos encontrados (como título, precio, método de envío, enlace y URL de la imagen), y guarda estos datos en un archivo CSV.

## Instalación

Para usar este proyecto, sigue estos pasos:

1. **Clona el repositorio:**

    ```bash
    git clone git@github.com:Brunovera180/scraping-ml.git
    ```

2. **Navega al directorio del proyecto:**

    ```bash
    cd scraping-ml
    ```

3. **Instala las dependencias:**

    Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados en tu sistema. Luego, instala las dependencias del proyecto con:

    ```bash
    npm install
    ```

4. **Configura las variables de entorno:**

    Crea un archivo `.env` en el directorio raíz del proyecto y agrega las siguientes variables, ajustando sus valores según tus necesidades:

    ```plaintext
    URL=https://www.mercadolibre.com
    SEARCH=tu término de búsqueda
    ```

## Uso

Para ejecutar el scraper, usa el siguiente comando:

```bash
node index.js
