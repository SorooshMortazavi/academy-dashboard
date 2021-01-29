interface IStudent{
    name:string
    lastName:string
    email:string
    password:string
    mobile:string
    createdAt?:Date
    courses?:string[]
    addresses?:any[]
}

export default IStudent