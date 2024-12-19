const generatePDF = (products) => {
    if (!window.jspdf) {
        console.error("jsPDF no está disponible. Verifica que la librería esté cargada.");
        return;
    }
    const margen = 20;
    const { jsPDF } = window.jspdf || window;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    doc.addImage('./img/logo.png', 10, 10, 25, 25)
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold");
    doc.text('Dirección: Blvd. las Delicias 2016, Hacienda Las Delicias, 22163 Tijuana, B.C.', pageWidth / 2, margen, { align: 'center' })
    doc.text(`Inventario cierre nocturno Deprizza - ${generateCurrentlyDate()}`, pageWidth / 2, margen + 10, { align: 'center' })
    doc.setDrawColor("#ff6c43");
    doc.setLineWidth(0.5);
    doc.line(10, margen + 18, pageWidth - 10, margen + 18)
    doc.text('Descripcion', 10, margen + 40)
    doc.text('Unidad de medida', pageWidth / 2, margen + 40)
    doc.text('Peso final', pageWidth - 10, margen + 40, { align: 'right' })
    doc.setDrawColor("#8d8c8c");
    doc.line(10, margen + 43, pageWidth - 10, margen + 43)
    doc.setFont("helvetica", "normal");
    if (products.length === 0) {
        doc.text("No hay productos disponibles.", pageWidth / 2, margen + 35, { align: 'center' });
    } else {
        // Aquí puedes agregar la lógica para imprimir la lista de productos, por ejemplo:
        let yPosition = margen + 50; // Empieza un poco más abajo después de la línea
        doc.setLineWidth(0.2);
        products.forEach((product, index) => {
            const num = (product.id).toString().padStart(2, '0');
            doc.text(`${num}. ${product.descripcion}`, 10, yPosition);
            doc.text(`${product.peso} ${product.unidad}`, pageWidth / 2, yPosition);
            doc.text(`${(product.cantidadActual * product.peso).toFixed(2)}`, pageWidth - 10, yPosition, { align: 'right' });
            doc.setDrawColor("#8d8c8c");
            doc.line(10, yPosition + 5, pageWidth - 10, yPosition + 3)
            yPosition += 10; // Espacio entre productos
        });
    }
    doc.save(`Cierre de ${generateCurrentlyDateFormatPDF()}.pdf`);
};

function generateCurrentlyDate(){
    // Crear un objeto Date con la fecha actual
    const fecha = new Date();

    // Opciones para el formato de fecha en español
    const opciones = { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
    };

    // Obtener la fecha en el formato deseado
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
    return fechaFormateada;
}

function generateCurrentlyDateFormatPDF() {
    // Crear un objeto Date con la fecha actual
    const fecha = new Date();
    
    // Función para calcular la semana del año
    function getWeekNumber(date) {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + 1) / 7);
    }

    // Obtener el mes en español
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });

    // Obtener el número de semana
    const numeroSemana = getWeekNumber(fecha);

    // Crear la cadena de texto con el formato "Mes Semana # X"
    const fechaFormateada = `${mes} Semana # ${numeroSemana} del año`;

    return fechaFormateada;
}


export default generatePDF;
