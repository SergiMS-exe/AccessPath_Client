import Person from './Person'

export type LoginContextType = {
    user: Person | undefined,
    setUser: Function
}