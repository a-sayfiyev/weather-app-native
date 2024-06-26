import axios from 'axios';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import Loader from './components/loader';
import Weather from './components/weather';

const API_KEY = '90ac68ffdd6ec8eafb96719f29b03ec5';

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [location, setLocation] = useState(null);

	const getWeather = async (latitude, longitude) => {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
		);
		setLocation(data);
		setIsLoading(false);
	};

	const setWeather = async query => {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
		);
		setLocation(data);
		setIsLoading(false);
	};

	const getLocation = async () => {
		setIsLoading(true);
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert('Permission to access location was denied');
				return;
			}

			const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
			getWeather(latitude, longitude);
		} catch (error) {
			Alert.alert("Can't find your current location.");
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getLocation();
	}, []);

	return isLoading ? (
		<Loader />
	) : (
		<Weather
			setWeather={setWeather}
			resetWeather={getLocation}
			temp={location.main.temp}
			name={location.name}
			condition={location.weather[0].main}
		/>
	);
}
