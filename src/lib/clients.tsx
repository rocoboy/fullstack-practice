import { Client } from "../models/Client";
import clientsData from "../mocks/clients.json"

const clients: Client[] = clientsData as Client[];

export async function fetchAllClients(): Promise<Client[] | undefined> {
    return clients;
}

export async function fetchClientByEmail(email: string): Promise<Client | undefined> {
    const findedClient  = clients.find((client) => client.email === email);
    return findedClient;
}