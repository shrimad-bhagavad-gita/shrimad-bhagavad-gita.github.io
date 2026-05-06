import { useState, useCallback } from "react";

const STORAGE_KEY = "gita_favorites";

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveToStorage(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => loadFromStorage());

    const toggleFavorite = useCallback((id) => {
        setFavorites(prev => {
            const next = prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id];
            saveToStorage(next);
            return next;
        });
    }, []);

    const isFavorite = useCallback(
        (id) => favorites.includes(id),
        [favorites]
    );

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.length,
    };
}
