let map

function initMap() {

    map = new google.maps.Map(
        document.querySelector('#stores-map'),
        { zoom: 14, center: { lat: 40.392499, lng: -3.698214 }, styles: mapStyles.retro }
    )
    getApiStores()
}


function getApiStores() {

    axios
        .get('/api')
        .then(res => placeStoresInMap(res.data))
        .catch(err => console.log('ERROR EN CLIENTE OBTENIENDO LAS TIENDAS', err))
}


function placeStoresInMap(stores) {

    stores.forEach(elm => {
        const position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }
        const title = elm.name
        new google.maps.Marker({ title, position, map })
    })

    map.setCenter({ lat: stores[0].location.coordinates[0], lng: stores[0].location.coordinates[1] })
}