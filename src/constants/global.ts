 const Months=[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export const MonthOptions=Months.map(item=>({
    value:item,
    label:item
}))

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];


export const bloodGroupOptions=bloodGroups.map(item=>({
    value:item,
    label:item
}))

export const gender=['male','female','other']

export const genderOptions=gender.map(item=>({
    value:item,
    label:item
}))