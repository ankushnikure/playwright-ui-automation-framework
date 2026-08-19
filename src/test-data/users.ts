import { USERNAME, PASSWORD } from "@config/env";
import { LoginCredentials } from "@types/auth.types";

export const loginCredentials: LoginCredentials[] = [
    {
        testcase: "Valid Credentials",
        username: USERNAME,
        password: PASSWORD,
        expectedResult: "success"
    },
    {
        testcase: "Invalid Credentials",
        username: "locked_out_user",
        password: PASSWORD,
        expectedResult: "failure"
    }
]