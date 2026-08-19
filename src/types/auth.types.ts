export interface LoginCredentials {
    testcase: string,
    username: string,
    password: string,
    expectedResult: "success" | "failure";
}