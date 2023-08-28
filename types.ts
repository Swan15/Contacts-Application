
export type contact = {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: {
        street: string,
        city: string,
        suite: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}
