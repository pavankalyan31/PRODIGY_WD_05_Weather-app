import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  weatherData: any;
  city: string = '';
  error: string = '';
  lat: number | null = null;
  lon: number | null = null;

  constructor(private weatherService: WeatherService) {
    this.getCurrentLocationWeather();
  }

  getWeather() {
    if (this.city) {
      this.weatherService.getWeatherByCity(this.city).subscribe(
        data => {
          this.weatherData = data;
          this.error = '';
        },
        err => this.error = 'City not found'
      );
    }
  }

  getCurrentLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.weatherService.getWeatherByLocation(this.lat, this.lon).subscribe(
          data => this.weatherData = data,
          err => this.error = 'Unable to retrieve weather data'
        );
      });
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }
}
