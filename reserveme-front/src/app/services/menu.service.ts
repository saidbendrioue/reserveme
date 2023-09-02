import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';
import { API_ENDPOINT } from '../constants/api.constant';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private baseUrl = `${API_ENDPOINT}/menus`;

    constructor(private http: HttpClient) { }

    getAllMenus(): Observable<Menu[]> {
        return this.http.get<Menu[]>(this.baseUrl);
    }

    getMenuById(id: string): Observable<Menu> {
        return this.http.get<Menu>(`${this.baseUrl}/${id}`);
    }

    getMenuByRestaurantId(id: string): Observable<Menu[]> {
        return this.http.get<Menu[]>(`${this.baseUrl}/getByRestaurantId/${id}`);
    }

    createMenu(menu: Menu, file: File): Observable<Menu> {
        const formData = new FormData();
        formData.append('menuData', JSON.stringify(menu));
        formData.append('file', file);
        return this.http.post<Menu>(this.baseUrl, formData);
    }

    updateMenu(id: string, menu: Menu): Observable<Menu> {
        return this.http.put<Menu>(`${this.baseUrl}/${id}`, menu);
    }

    deleteMenu(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
