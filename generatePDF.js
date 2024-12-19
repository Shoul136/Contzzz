const generatePDF = () => {
    if (!window.jspdf) {
        console.error("jsPDF no está disponible. Verifica que la librería esté cargada.");
        return;
    }

    const { jsPDF } = window.jspdf || window;
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
};

export default generatePDF;
