export interface User_Marketer {
    email: String;
    password: String;
    role: String;
    full_name: String;
    contact_no: String;
    company: String;
    designation: String;
    type: String;
    industry: String;
    profile_pic: String;
    company_pic: String;

}
export interface User_Supplier {
    email: String;
    password: String;
    role: String;
    full_name: String;
    contact_no: String;
    experience: String;
    type: String;
    company: String;
    industry: String;
    company_pic: String;

}
export interface User_Designer {
    email: String;
    password: String;
    role: String;
    full_name: String;
    contact_no: String;
    gender: String;
    dob: String;
    experience: String;
    min_pay: String;
    profile_pic: String;
}





export interface User {


    email: String;
    password: String;
    role: String;
    full_name: String;
    contact_no: String;
    company: String;
    designation: String;
    type: String;
    industry: String;
    profile_pic: String;
    company_pic: String;


    gender: String;
    dob: String;
    experience: String;
    min_pay: String;
    id: String;

}




export interface SupplierRatings {

    delivery_of_supplies: String;
    service_given_by_supplier: String;
    quality_displayed_by_supplier: String;
    set_pricing_by_supplier: String;
    to: String;
    user_type: String;

}

export interface DesignerRatings {
    creativity_skills: String;
    technical_skills: String;
    business_people: String;
    focus_under_pressure: String;
    to: String;
    user_type: String;

}
