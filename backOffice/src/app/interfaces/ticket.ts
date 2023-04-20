export interface Ticket {
    _id?:       ID;
    nombre:    string;
    productos: ID[];
    location?: string;
    createdAt?: AtedAt;
    updatedAt?: AtedAt;
}

export interface ID {
    $oid: string;
}

export interface AtedAt {
    $date: Date;
}
