

const adminPaths=[
    {
        name:'Dashboard',
        path:'dashboard',
        element:'AdminDashboard'
    },
    {
        name:'User Management',
        children:[
          {
            name:'Create Admin',
            path:'create-admin',
            element:'CreateAdmin'
          },
          {
            name: 'Create Faculty',
            path: 'create-faculty',
            element:'CreateFaculty' ,
          },
          {
            name: 'Create Student',
            path: 'create-student',
            element: 'CreateStudent',
          },
     

        ]
    }
]

//* Programatical way
export const adminRoutes=adminPaths.reduce((acc,item)=>{
    if(item.path && item.element){
        acc.push({
            path:item.path,
            element:item.element
        })
    }

    if(item.children){
        item.children.forEach((child)=>{
            acc.push({
                path:child.path,
                element:child.element
            })
        })
    }
    return acc;
},[])

// for sidebar
const sidebar=adminPaths.reduce((acc,item)=>{
    if(item.name && item.path){
        acc.push({
            key:item.name,
            label:`/admin/${item.path}`
        })
    }

    if(item.children){
        acc.push({
            key:item.name,
            label:item.name,
            children:item.children.map((child)=>{
                return {
                    key:child.name,
                label:`/admin/${child.path}`
                }
            })
        })
    }
    return acc;
},[])

console.log(sidebar);