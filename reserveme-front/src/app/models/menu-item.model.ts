import { Menu } from "./menu.model";

export class MenuItem {
    id?: string | undefined | null;
    dishName?: string | undefined | null;
    description?: string | undefined | null;
    price?: number;
    imageUrl?: string | undefined | null;
    menuId?: string | undefined | null;
}
