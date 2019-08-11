import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({})
  const [sucess, setSucess] = useState(false)
  const [mode, setMode] = useState('EDIT')
  const [genres, setGenres] = useState([])

  const [data, setData] = useState({})
  useEffect(() => {
    axios.get('/api/series/' + match.params.id).then(res => {
      setData(res.data)
      setForm(res.data)
    })
  }, [match.params.id])

  useEffect(() => {
    axios.get('/api/genres').then(res => {
      setGenres(res.data.data)
    })
  })

  // custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroudPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const save = () => {
    axios.put('/api/series/' + match.params.id, form).then(res => {
      setSucess(true)
    })
  }
  if (sucess) {
    // return <Redirect to="/series" />
  }
  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img
                  className="img-fluid img-thumbnail"
                  src={data.poster}
                  alt={data.name}
                />
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  <Badge color="success">Assistido</Badge>
                  <Badge color="warning">Para assistir</Badge>
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <button className="btn btn-primary" onClick={() => setMode('EDIT')}>
          Editar
        </button>
      </div>
      {mode === 'EDIT' && ( // apenas exibe o que estiver dentro das chaves se o primeiro teste for true
        <div className="container">
          <h1>Nova Série</h1>
          <pre>{JSON.stringify(form)}</pre>
          <button className="btn btn-primary" onClick={() => setMode('INFO')}>
            Cancelar edição
          </button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                value={form.name}
                onChange={onChange('name')}
                className="form-control"
                id="name"
                placeholder="Nome da Série"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Comentários</label>
              <input
                type="text"
                value={form.comments}
                onChange={onChange('comments')}
                className="form-control"
                id="name"
                placeholder="Nome da Série"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Gênero</label>
              <select className="form-control" onChange={onChange('genre')}>
                {genres.map(genre => (
                  <option
                    key={genre.id}
                    value={genre.id}
                    select={genre.id === form.genre}
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" onClick={save} className="btn btn-primary">
              Salvar
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default InfoSerie
