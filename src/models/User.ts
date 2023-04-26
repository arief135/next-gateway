export type User = {
    user: string,
    hash: string
}

export const UserData: User[] = [
    {
        user: 'testuser',
        hash: '$2a$12$VoEUIR3cVg6A5ZZjZqpqCeyywJ.NsM.K4PNdPs7J8AIkZIGH6P6oi'
    }
]

export const getUser = (user: string) => {
    return UserData.find((e) => e.user == user)
}