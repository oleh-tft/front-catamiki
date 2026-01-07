import type { UserType } from "../model/UserType";

export default class UserDao {
    static authenticate(email: string, password: string): Promise<UserType | null> {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                if (email == "a@ha.ha" && password == "123") {
                    resolve({
                        name: "John",
                        surname: "Doe",
                        username: "user-65602caaf45b",
                        email: "a@ha.ha",
                        dob: "1998-10-05",
                        imageUrl: "img/user.jpg"
                    })
                } else {
                    resolve(null)
                }
            }, 700)
        })
    }
}