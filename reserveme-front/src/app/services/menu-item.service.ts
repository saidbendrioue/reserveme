import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';
import { API_ENDPOINT } from '../constants/api.constant';

@Injectable({
    providedIn: 'root'
})
export class MenuItemService {
    private baseUrl = `${API_ENDPOINT}/menu-items`;

    constructor(private http: HttpClient) { }

    getAllMenuItems(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(this.baseUrl);
    }

    getMenuItemsByMenuId(menuId: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${this.baseUrl}/${menuId}`);
    }

    createMenuItem(menuItem: MenuItem, file: File): Observable<MenuItem> {
        const formData = new FormData();
        formData.append('menuItemData', JSON.stringify(menuItem));
        formData.append('file', file);

        return this.http.post<MenuItem>(this.baseUrl, formData);
    }

    updateMenuItem(id: string, menuItem: MenuItem): Observable<MenuItem> {
        return this.http.put<MenuItem>(`${this.baseUrl}/${id}`, menuItem);
    }

    deleteMenuItem(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
