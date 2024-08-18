export const roles=[{
    role:'superadmin',
    permissions:[
        'create_user',
        'read_users',
        'update_user',
        'delete_user',   //specific to superadmin
        'update_forms',
        'delete_forms',
        'create_forms',
    ]
},
{
    role: 'admin',
    permissions:[
        'read_users',
        'update_user',
        'create_users',
        'update_forms',
        'update_forms',
        'delete_forms',
    ]
},
{
role: 'school-admin',
permissions: [
    'update_form',
    'delete_form',
    'create_form',
]
},{
    role: 'user',
    permissions: [
        'read_forms',
    ]
}

//I want to add a role of registered users who can read and submit reviews and updates for consideration by school-admin, admin, and super-admin.
];