
console.log("asynchrone Objekterstellung geladen");

async function createAsyncObject(ClassConstructor) {
    const obj = new ClassConstructor(); // Erstellt das Objekt synchron
    if (obj.init) {
        await obj.init(); // Warte auf die Initialisierung, falls es eine gibt
    }
    return obj; // Gib das vollständig erstellte Objekt zurück
}
