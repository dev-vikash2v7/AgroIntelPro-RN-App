const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);
        getWeatherData(locationData.coords.latitude, locationData.coords.longitude);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

export {getLocation}