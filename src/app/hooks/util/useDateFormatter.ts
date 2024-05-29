export function useDateFormatter() {
    return {
        dateFormat: (date: Date, format?: string) => {
            const yyyy = String(date.getFullYear());
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            const hh = String(date.getHours()).padStart(2, "0");
            const m = String(date.getMinutes()).padStart(2, "0");
            const ss = String(date.getSeconds()).padStart(2, "0");
            switch (format) {
                case 'YYYY-MM-DD':
                    return `${yyyy}-${mm}-${dd}`;
                default:
                    return `${yyyy}${mm}${dd}${hh}${m}${ss}`;
            }
      },
    };
}