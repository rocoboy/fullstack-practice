    import accounts from "../mocks/accounts.json";
    import { Auth } from "../models/User";

    const accountsData: Auth[] = accounts as Auth[];

    export async function fetchAccountByEmail(email: string) : Promise<Auth | undefined>{

        const filteredAccount = accountsData.find((account) => account.email === email);
        return filteredAccount;
        
    }