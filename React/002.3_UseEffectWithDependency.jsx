import { useEffect, useState } from 'react'


export default function App1() {

  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(30);

  useEffect(() => {
    async function GitHubProfile() {
      const response = await fetch(`https://api.github.com/users?per_page=${count}`);
      const data = await response.json();
      setUsers(data);
    }

    GitHubProfile();
  }, [count]);

  return (
    <>
      <h2>GitHub User</h2>
      <input type="number" value={count} onChange={(e) => setCount(e.target.value)} />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", justifyItems: "center", flexWrap: "wrap", gap: "5px" }}>
        {
          users.map(user => {
            return <img src={user.avatar_url} height={"100px"} width={"100px"} alt="" key={user.login} />
          })
        }
      </div>
    </>
  )
}
