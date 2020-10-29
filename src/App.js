import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
     setRepositories(response.data) 
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Teste",
      url: "http://www.github.com/marciordj"
    })    

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <div key={repo.id}>
            <li key={repo.id}>{repo.title}</li>
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </div>
          
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
