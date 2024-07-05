export interface user {
    address : {
        city:string,
        geo: {
            lat : string ,
            lng : string
        },
        street: string ,
        suite: string,
        zipcode: number,
    },
    company : 
    {
        bs:  string,
        catchPhrase : string
        name: string
    } ,
    email : string ,
    id: number ,
    name: string,
    phone:number
    username : string ,
    website : string
}