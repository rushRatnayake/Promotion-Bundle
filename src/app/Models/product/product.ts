export interface Product {
    name?: String;
    brand?: String;
    price?: String;
    category?: String;
    dim?: dim;
    weight?: String;
    volume?: String;
    specification?: String;
    description?: String;
    img_url?: String;
}

export interface dim {
    l: String;
    w: String;
    h: String;
}
