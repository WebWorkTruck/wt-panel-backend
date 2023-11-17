export interface User {
    id: string
    name: string
    company: string
    post: string
    birth_date: string
    personal_phone: string
    work_phone: string
    roles: {
        id: string
        title: string
    }[]
}
