const puppeteer = require('puppeteer');
const fs = require('fs');

require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navegar a la página principal
    await page.goto(process.env.URL);
    
    // Esperar a que la página cargue completamente
    await page.waitForTimeout(2000);
    
    // Realizar búsqueda
    await page.type('#cb1-edit', process.env.SEARCH);
    await page.click('.nav-icon-search');
    
    // Esperar a que los resultados se carguen
    await page.waitForTimeout(2000);
    await page.waitForSelector('.poly-card__content', { timeout: 10000 });

    // Extraer los datos
    const datos = await page.evaluate(() => {
        // Seleccionar todos los contenedores de contenido
        const elementos = document.querySelectorAll('.poly-card__content');
        
        return Array.from(elementos).map(elemento => {
            // Encontrar el contenedor de imagen al mismo nivel
            const portadaElem = elemento.parentElement.querySelector('.poly-card__portada');
            
            const tituloElem = elemento.querySelector('.poly-component__title');
            const precioElem = elemento.querySelector('.poly-component__price');
            const envioElem = elemento.querySelector('.poly-component__shipping');
            const imagenElem = portadaElem ? portadaElem.querySelector('img') : null;
            
            // Extraer el enlace y el texto del título
            const link = tituloElem ? tituloElem.href : null;
            const titulo = tituloElem ? tituloElem.textContent.trim() : null;
            const precio = precioElem ? precioElem.textContent.trim() : null;
            const envio = envioElem ? envioElem.textContent.trim() : null;
            const imagenUrl = imagenElem ? imagenElem.src : null; // Extraer el atributo src de la imagen
            
            // Convertir el precio a un número para ordenar correctamente
            const precioNum = parseFloat(precio ? precio.replace(/[^0-9,.]/g, '').replace(',', '.') : 'NaN');

            return {
                titulo: titulo,
                precio: precio,
                precioNum: isNaN(precioNum) ? Infinity : precioNum,
                envio: envio,
                link: link,
                imagen: imagenUrl
            };
        });
    });

    // Ordenar los datos por precio (de menor a mayor)
    const datosOrdenados = datos.sort((a, b) => a.precioNum - b.precioNum);

    // Crear el CSV
    const csv = datosOrdenados.map(dato => `"${dato.titulo}","${dato.precio}","${dato.envio}","${dato.link}","${dato.imagen}"`).join('\n');

    // Guardar los datos en un archivo CSV
    fs.writeFileSync('mercado-libre.csv', csv);

    console.log('Datos extraídos y guardados en mercado-libre.csv');

    await page.waitForTimeout(6000);
    await browser.close();
})();
