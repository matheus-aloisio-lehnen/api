export const geocodeMock = {
    results: [
        {
            address_components: [
                {
                    long_name: "748",
                    short_name: "748",
                    types: [ "street_number" ]
                },
                {
                    long_name: "Rua Almirante Lamego",
                    short_name: "R. Alm. Lamego",
                    types: [ "route" ]
                },
                {
                    long_name: "Centro",
                    short_name: "Centro",
                    types: [ "political", "sublocality", "sublocality_level_1" ]
                },
                {
                    long_name: "Florianópolis",
                    short_name: "Florianópolis",
                    types: [ "administrative_area_level_2", "political" ]
                },
                {
                    long_name: "Santa Catarina",
                    short_name: "SC",
                    types: [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    long_name: "Brazil",
                    short_name: "BR",
                    types: [
                        "country",
                        "political"
                    ]
                },
                {
                    long_name: "88010-400",
                    short_name: "88010-400",
                    types: [
                        "postal_code"
                    ]
                }
            ],
            formatted_address: "R. Alm. Lamego, 748 - Centro, Florianópolis - SC, 88010-400, Brazil",
            geometry: {
                bounds: {
                    northeast: {
                        lat: -27.5904214,
                        lng: -48.5605505
                    },
                    southwest: {
                        lat: -27.5907037,
                        lng: -48.5608691
                    }
                },
                location: {
                    lat: -27.5905635,
                    lng: -48.5607041
                },
                location_type: "ROOFTOP",
                viewport: {
                    northeast: {
                        lat: -27.5890512697085,
                        lng: -48.5593750197085
                    },
                    southwest: {
                        lat: -27.5917492302915,
                        lng: -48.5620729802915
                    }
                }
            },
            partial_match: true,
            place_id: "ChIJmwcOz_U3J5URHHa1zI9fOQY",
            types: [ "premise" ]
        }
    ],
    status: "OK"
}