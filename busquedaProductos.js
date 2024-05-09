
function mostrarTodosLosProductos() {
    fetch('Productos.json')
    .then(response => response.json())
    .then(data => {
        mostrarProductos(data['Listado de Productos']); 
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        mostrarError('Error al cargar el archivo JSON.');
    });
}

function mostrarProductos(productos) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '<h2>Lista de Productos</h2>';
    
    
    let tablaHTML = `
        <table>
            <tr>
                <th>IdProducto</th>
                <th>NombreProducto</th>
                <th>Proveedor</th>
                <th>Categoría</th>
                <th>CantidadPorUnidad</th>
                <th>PrecioUnidad</th>
                <th>UnidadesEnExistencia</th>
                <th>UnidadesEnPedido</th>
                <th>NivelNuevoPedido</th>
                <th>Suspendido</th>
            </tr>
    `;
    
    // llenamos la tabla
    productos.forEach(producto => {
        tablaHTML += `
            <tr>
                <td>${producto.IdProducto}</td>
                <td>${producto.NombreProducto}</td>
                <td>${producto.Proveedor}</td>
                <td>${producto.Categoría}</td>
                <td>${producto.CantidadPorUnidad}</td>
                <td>${producto.PrecioUnidad}</td>
                <td>${producto.UnidadesEnExistencia}</td>
                <td>${producto.UnidadesEnPedido}</td>
                <td>${producto.NivelNuevoPedido}</td>
                <td>${producto.Suspendido}</td>
            </tr>
        `;
    });
    
    tablaHTML += '</table>'; 
    
    // mostramos la tabla
    resultadoDiv.innerHTML += tablaHTML;
}

function filtrarProductos(){
    const proveedorSeleccionado = document.getElementById('selectProveedor').value;
    const categoriaSeleccionada = document.getElementById('selectCategoria').value;

    fetch('Productos.json')
    .then(response => response.json())
    .then(data => {
        let productosFiltrados = data['Listado de Productos'];

        if (proveedorSeleccionado !== ''){
            productosFiltrados = productosFiltrados.filter(producto => producto.Proveedor === proveedorSeleccionado);
        }
        if (categoriaSeleccionada !== ''){
            productosFiltrados = productosFiltrados.filter(producto => producto.Categoría === categoriaSeleccionada);
        }
        mostrarProductos(productosFiltrados);        

    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        mostrarError('Error al cargar el archivo JSON.');
    });
}


function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>${mensaje}</p>`;
}

mostrarTodosLosProductos();
