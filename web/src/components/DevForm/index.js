import React, {useState, useEffect} from 'react';


function DevForm({ onSubmit }){
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [git_user, setGit_user] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) =>{
        const{ latitude, longitude} = position.coords;
        setLongitude(longitude)
        setLatitude(latitude);
      }, 
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    await onSubmit({
      git_user,
      techs,
      latitude,
      longitude
    });
    setGit_user("");
    setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="input-block">
      <label htmlFor="git_user">Usuario do Git</label>
      <input 
        name="git_user" 
        id="git_user" 
        type="text"
        value={git_user}
        onChange={e => setGit_user(e.target.value)}
        />
    </div>

    <div className="input-block">
      <label htmlFor="techs">Tecnologias</label>
      <input 
        name="techs" 
        id="techs" 
        type="text"
        value={techs}
        onChange={e => setTechs(e.target.value)}
        />
    </div>

    <div className="input-group">
      <div className="input-block">
        <label htmlFor="latitude">latitude</label>
        <input 
        type="number" 
        name="latitude" 
        id="latitude" 
        value={latitude} 
        onChange={e => setLatitude(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="longitude">longitude</label>
        <input
         type="number"
         name="longitude" 
         id="longitude" 
         value={longitude} 
         onChange={e => setLongitude(e.target.value)} />
      </div>
    </div>
    <button type="submit">Salvar</button>
  </form>

  );
}

export default DevForm;