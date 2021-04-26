import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchSelection } from "./components/SearchSelection";
import { getUsers, User } from "./services/Users";
import "./styles/main.css";

export interface UserSelect {
  value: string;
  label: string;
}
const App: React.FunctionComponent = () => {
  const [users, setUsers] = useState<UserSelect[]>([]);
  const [userName, setNames] = useState<string | string[]>([]);
  const [isLoading, setLoading] = useState(false);

  function loadUses(): void {
    if (users.length === 0) {
      setLoading(true);
      getUsers()
        .then((_users: User[]) => {
          const users: UserSelect[] = _users.map((user) => {
            return {
              value: user.name,
              label: user.username,
            };
          });
          setUsers(users);
        })
        .finally(() => setLoading(false));
    }
  }

  return (
    <>
      <h2 style={{ marginLeft: "2rem" }}>Поиск человека по имени</h2>
      <SearchSelection
        className={"search-selection"}
        options={users}
        value={userName}
        onChange={setNames}
        multi={true}
        focus={loadUses}
        isLoading={isLoading}
      />
      <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>{userName}</div>
    </>
  );
};

export default App;
