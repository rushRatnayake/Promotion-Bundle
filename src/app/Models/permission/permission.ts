export interface Permission_BackEnd {
    permission_id ?: number;
    module_id ?: number;
    catagory_id ?: number;
    can_view ?: boolean;
    can_add ?: boolean;
    can_delete ?: boolean;
    created_at ?: string;
    role_id ?: number;
}

export interface Permission_FrontEnd {
    permission_id ?: number;
    module_id ?: number;
    catagory_id ?: number;
    can_view ?: boolean;
    can_add ?: boolean;
    can_delete ?: boolean;
    created_at ?: string;
    role_id ?: number;
}


export let PermissionCategoryList = [
    {
        id: 0, name: "dashboard", path: "/"
    },
    {
        id: 1, name: "Booking", path: "/booking_diary"
    },
    {
        id: 2, name: "Loan Car Diary", path: "/loan_car/loan_car_diary"
    },
    {
        id: 3, name: "Loan Vehicles", path: "/loan_car/loan_vehicles"
    },
    {
        id: 4, name: "Job", path: "/booking_diary/job_centre_list"
    },
    {
        id: 5, name: "Inspection", path: "/inspection/create-inspection"
    },
    {
        id: 6, name: "Inspection Groups", path: "/inspection/groups"
    },
    {
        id: 7, name: "Inspection Templates", path: "/inspection/templates"
    },
    {
        id: 8, name: "Inspection Settings", path: "/inspection/settings"
    },
    {
        id: 9, name: "WOF Check Sheet", path: "/inspection/wof"
    },
    {
        id: 10, name: "Customer", path: "/customer"
    },
    {
        id: 11, name: "Vehicle", path: "/vehicle"
    },
    {
        id: 12, name: "Supplier", path: "/supplier"
    },
    {
        id: 13, name: "Product", path: "/product"
    },

]
