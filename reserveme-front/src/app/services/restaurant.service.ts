import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { API_ENDPOINT } from '../constants/api.constant';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    private baseUrl = `${API_ENDPOINT}/restaurants`;

    constructor(private http: HttpClient) { }

    getAllRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(this.baseUrl);
    }

    getRestaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${this.baseUrl}/${id}`);
    }

    createRestaurant(restaurant: Restaurant, file: File): Observable<Restaurant> {
        const formData = new FormData();
        formData.append('restaurantData', JSON.stringify(restaurant));
        formData.append('file', file);
        return this.http.post<Restaurant>(this.baseUrl, formData);
    }

    updateRestaurant(id: string, restaurant: Restaurant): Observable<Restaurant> {
        return this.http.put<Restaurant>(`${this.baseUrl}/${id}`, restaurant);
    }

    deleteRestaurant(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
