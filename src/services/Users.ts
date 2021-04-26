export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: number;
    lng: number;
  };
}
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
const baseUrl = "https://jsonplaceholder.typicode.com";
export const getUsers = () => {
  return new Promise<User[]>(async (resolve) => {
    const res = await fetch(`${baseUrl}/users`);
    const users = res.json();
    resolve(users);
  });
};
