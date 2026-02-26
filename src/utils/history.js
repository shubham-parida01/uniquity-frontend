const HISTORY_KEY = 'uniquity_analysis_history';

export function saveToHistory(record) {
    try {
        const existing = getHistory();
        const newRecord = {
            ...record,
            id: Date.now().toString(),
            timestamp: new Date().toISOString()
        };
        const updated = [newRecord, ...existing];
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
        return updated;
    } catch (e) {
        console.error("Error saving to history", e);
        return [];
    }
}

export function getHistory() {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Error reading history", e);
        return [];
    }
}

export function clearHistory() {
    try {
        localStorage.removeItem(HISTORY_KEY);
        return [];
    } catch (e) {
        console.error("Error clearing history");
        return [];
    }
}
