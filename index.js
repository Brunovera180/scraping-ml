const puppeteer = require('puppeteer');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();
const prisma = new PrismaClient();

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navegar a la página principal
    await page.goto(process.env.URL);
    
    // Esperar a que la página cargue completamente
    await page.waitForSelector('.nav-logo', { timeout: 10000 });

    // Realizar búsqueda
    await page.type('#cb1-edit', process.env.SEARCH);
    await page.click('.nav-icon-search');
    
    // Esperar a que los resultados se carguen
    await page.waitForSelector('.poly-card__content', { timeout: 10000 });

    // Extraer los datos
    const datos = await page.evaluate(() => {
        const elementos = document.querySelectorAll('.poly-card__content');
        
        return Array.from(elementos).map(elemento => {
            const portadaElem = elemento.parentElement.querySelector('.poly-card__portada');
            
            const tituloElem = elemento.querySelector('.poly-component__title');
            const precioElem = elemento.querySelector('.poly-price__current');
            const envioElem = elemento.querySelector('.poly-component__shipping');
            const imagenElem = portadaElem ? portadaElem.querySelector('img') : null;
            
            const link = tituloElem ? tituloElem.href : null;
            const titulo = tituloElem ? tituloElem.textContent.trim() : null;
            const precio = precioElem ? precioElem.textContent.trim() : null;
            const envio = envioElem ? envioElem.textContent.trim() : null;
            const imagenUrl = imagenElem ? imagenElem.src : null;

            // Precio tiene que dejar de ser string y pasar a ser float
            let precioNum = null;
            if (precio) {
                // Eliminar símbolos de dólar y comas
                const cleanedPrice = precio.replace(/[$,]/g, '');
                precioNum = parseFloat(cleanedPrice);
                
                // Formatear a 3 decimales
                if (!isNaN(precioNum)) {
                    precioNum = precioNum.toFixed(3);
                }
            }

            return {
                titulo: titulo,
                precio: precioNum,
                envio: envio,
                link: link,
                imagen: imagenUrl
            };
        });
    });

    // Insertar los datos en la base de datos
    for (const dato of datos) {
        await prisma.producto.create({
            data: {
                titulo: dato.titulo,
                precio: parseFloat(dato.precio), // Asegúrate de convertir a float
                envio: dato.envio,
                link: dato.link,
                imagen: dato.imagen
            }
        });
    }

    console.log('Datos extraídos y guardados en la base de datos.');

    await browser.close();
})();
