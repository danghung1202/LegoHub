export interface Theme {
    theme: string;
    setCount?: number;
    subthemeCount?: number;
    yearFrom?: number;
    yearTo?: number;
    isSelected?: boolean;
}

export interface Subtheme {
    theme: string;
    subtheme: string;
    setCount: number;
    yearFrom: number;
    yearTo: number;
    isSelected?: boolean;
}

export interface Year {
    theme: string;
    year: string;
    setCount: number;
    isSelected?: boolean;
}