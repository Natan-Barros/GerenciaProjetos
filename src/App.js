import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('/repositories')
       .then(response => {setRepositories(response.data)});
  }, [])

  async function handleAddRepository() {
    var response = await api.post('/repositories',{
      title : "Testes Atutomatizados",
      url : "https://github.com/Natan-Barros/DesafioNodeJs",
      techs : ["NodeJS", "Docker", "C#"]
    })
    
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository =>(
          <div key={repository.id}>
            <li>
              {repository.title}
            </li>
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>
        ))}
        

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
