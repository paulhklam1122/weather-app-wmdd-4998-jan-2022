import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, View } from 'react-native'
import Content from './src/components/layout/Content'
import Footer from './src/components/layout/Footer'
import Form from './src/components/layout/Form'

const images = {
  Clear: 'http://ayay.co.uk/mobiles/weather/strange/northern-lights.jpg',
  Clouds:
    'https://www.princeton.edu/sites/default/files/styles/full_2x/public/images/2018/01/clouds-19.jpg?itok=7jputHX1',
  Rain: 'https://i.pinimg.com/736x/54/59/d7/5459d741279e8d72661990f52774473f--cell-phone-wallpapers-gif-photos.jpg'
}

const App = () => {
  const [city, setCity] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [temp, setTemp] = useState('')
  const [weather, setWeather] = useState('')
  const [pressure, setPressure] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [minTemp, setMinTemp] = useState('')

  const fetchData = () => {
    fetchCityData(city)
  }

  const fetchCityData = async city => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c8c4865b1ee49f77a87780ffabb644b3&units=metric`
    const api_call = await fetch(url)

    const response = await api_call.json()

    console.log('response', response)

    setCountryCode(response.sys.country)
    setTemp(response.main.temp)
    setWeather(response.weather[0].main)
    setPressure(response.main.pressure)
    setWindSpeed(response.wind.speed)
    setMinTemp(response.main.temp_min)
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: images[weather] }} style={styles.image} />
      <Form onChangeText={text => setCity(text)} onSubmit={fetchData} />
      <Content temp={temp} city={city} countryCode={countryCode} weather={weather} />
      <Footer pressure={pressure} windSpeed={windSpeed} minTemp={minTemp} />
      <StatusBar style='auto' />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
})
