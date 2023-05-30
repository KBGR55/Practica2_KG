const URL = "https://fakerestapi.azurewebsites.net"

export const Activity = async () => {
    const datos = await (await fetch(URL + "/api/v1/Activities", {
        method: "GET"
    })).json();
    console.log("Listar:", datos);
    return datos;
};

export const GuardarActivity = async (data) => {
    const headers = {
        "Content-Type": "application/json"
    };
    const datos = await (await fetch(URL + "/api/v1/Activities", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("Datos guardados:", datos);
    return datos;
};

export const ModificarActividad = async (id, data) => {
    const headers = {
        "Content-Type": "application/json",
    }; 
    const response = await fetch(`${URL}/api/v1/Activities/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Datos modificados:", result);
    return result;
};

export const ObtenerDatos = async (nroFila) => {
    const datos = await (await fetch(URL + "/api/v1/Activities/" + nroFila, {
        method: "GET",
    })).json();
    console.log("Datos obtenidos buscados:", datos);
    return datos;
};

export const GetDatos = async (nroFila) => {
    const response = await fetch(URL + "/api/v1/Activities/" + nroFila, {
        method: "GET",
    });
    const result = await response.json();
    console.log("Datos obtenidos a modificar:", result);
    return result;
};
