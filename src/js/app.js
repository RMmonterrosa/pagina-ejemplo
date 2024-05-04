document.addEventListener('DOMContentLoaded', () => {
    const dataTable = document.getElementById('data-table'); // Sacar las id de los forms
    const addForm = document.getElementById('add-form');

    // Función para cargar datos en la tabla
    async function loadData() {
        try {
            const response = await fetch('http://localhost:3000/ejemplo');
            const data = await response.json();
            
            // Limpiar la tabla antes de cargar los nuevos datos
            dataTable.innerHTML = '<thead class="thead-light"><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Estatura</th><th>Detalle</th></tr></thead><tbody>'; // Elimina toda la datatable pero vuelve a recolocar los heads de datatable 
            
            // Insertar filas con los datos
            data.forEach(item => {
                dataTable.innerHTML += `<tr data-id="${item.id}"><td>${item.id}</td><td>${item.nombre}</td><td>${item.apellido}</td><td>${item.edad}</td><td>${item.estatura}</td><td><button class="btn btn-secondary">Detalle</button></td></tr>`;
            });

            dataTable.innerHTML += '</tbody>'; // Cierra el table body

            // Agregar event listener para los botones de detalle
            const detailBtns = document.querySelectorAll('.detail-btn');
            detailBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const row = e.target.closest('tr');
                    const id = row.dataset.id;
                    console.log(row)
                    console.log(id)
                    window.location.href = `detalle.html?id=${id}`;
                });
            });
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    // Función para agregar un nuevo registro
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addForm);
        const requestData = {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch('http://localhost:3000/ejemplo', requestData);
            if (response.ok) {
                loadData();
            } else {
                console.error('Error al agregar registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar registro:', error);
        }
    });

    // Cargar datos al cargar la página
    loadData();
});






