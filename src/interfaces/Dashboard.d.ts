interface ItemPropsDashboard {
    items: ItemNav[];
}

export interface ItemNav {
    title: string;
    link: string;
    id: number;
    colorText: number | null;
    selectedIndex:(number: number)=> void; 
}