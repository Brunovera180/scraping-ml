-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "envio" TEXT,
    "link" TEXT NOT NULL,
    "imagen" TEXT,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);
