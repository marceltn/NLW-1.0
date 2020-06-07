import React, { useState, useEffect, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import api from '../../services/api'

import './styles.css'
import logo from '../../assets/logo.svg'

interface Item {
  id: number
  title: string
  image_url: string
}

interface UF {
  code: number
  initial: string
}

interface City {
  code: number
  name: string
}

interface IBGEUfResponse {
  id: number
  sigla: string
}

interface IBGECityResponse {
  id: number
  nome: string
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([])
  const [ufs, setUfs] = useState<UF[]>([])
  const [cities, setCities] = useState<City[]>([])

  const [selectedUf, setSelectedUf] = useState(0)
  const [selectedCity, setSelectedCity] = useState(0)

  useEffect(() => {
    api.get('items').then(res => {
      setItems(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => {
      const ufInitials = res.data.map<UF>(uf => ({
        code: uf.id,
        initial: uf.sigla,
      }))
      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then(res => {
      const cityInitials = res.data.map<City>(city => ({
        code: city.id,
        name: city.nome
      }))
      setCities(cityInitials)
    })
  }, [selectedUf])

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = Number(event.target.value)
    setSelectedUf(uf)
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = Number(event.target.value)
    setSelectedCity(city)
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta logo"/>

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>Cadastro do <br/> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input type="text" name="whatsapp" id="whatsapp"/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={{ lat: -23.5575756, lng: -46.635728}} zoom={17.5}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={{ lat: -23.5575756, lng: -46.635728}} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select onChange={handleSelectedUf} value={selectedUf} name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf.code} value={uf.code}>{uf.initial}</option>
                ))}
              </select>
            </div>
             
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select onChange={handleSelectedCity} value={selectedCity} name="city" id="city">
                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option key={city.code} value={city.code}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Slecione um ou mais itens de coleta</span>
          </legend>

          <ul className="items-grid">
            {items.map((item: Item) => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
}

export default CreatePoint
