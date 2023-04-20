// To parse this data:
//
//   import { Convert } from "./file";
//
//   const producto = Convert.toProducto(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface User {
    _id?:         ID;
    name:        string;
    surname:     string;
    email:       string;
    password:    string;

    createdAt?:   AtedAt;
    updatedAt?:   AtedAt;
}

export interface ID {
    $oid: string;
}

export interface AtedAt {
    $date: DateClass;
}

export interface DateClass {
    $numberLong: string;
}
