import { USERNAME, PASSWORD } from "@config/env";

export const validUser = {
    username: USERNAME,
    password: PASSWORD,
}

export const invalidUser = {
    username: "locked_out_user",
    password: "wrongPassword",
}