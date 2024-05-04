document.addEventListener('DOMContentLoaded', () => {
    const detailForm = document.getElementById('detail-form');
    const deleteBtn = document.getElementById('delete-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Función para cargar los detalles del registro
    async function loadDetail() {
        try {
            const response = await fetch(`http://localhost:3000/ejemplo/${id}`);
            const data = await response.json();
            populateForm(data);
        } catch (error) {
            console.error('Error al cargar detalles:', error);
        }
    }

    // Función para llenar el formulario con los datos recibidos
    function populateForm(data) {
        document.getElementById('nombre').value = data[0].nombre;
        document.getElementById('apellido').value = data[0].apellido;
        document.getElementById('edad').value = data[0].edad;
        document.getElementById('estatura').value = data[0].estatura;
    }

    // Función para enviar los datos editados al servidor
    detailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(detailForm);
        const requestData = {
            method: 'PUT',
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`http://localhost:3000/ejemplo/${id}`, requestData);
            if (response.ok) {
                // Si la edición fue exitosa, redirigir a index.html
                window.location.href = 'index.html';
            } else {
                console.error('Error al editar registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al editar registro:', error);
        }
    });

    // Función para eliminar el registro
    deleteBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`http://localhost:3000/ejemplo/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Si la eliminación fue exitosa, redirigir a index.html
                window.location.href = 'index.html';
            } else {
                console.error('Error al eliminar registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar registro:', error);
        }
    });

    // Cargar detalles al cargar la página
    loadDetail();
});

