// src/db.js
import { openDB } from 'idb';

const DB_NAME = 'QuizAppDB';
const STORE_NAME = 'quizResults';

export const initDB = async () => {
    const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
    return db;
};

export const addResult = async (result) => {
    const db = await initDB();
    await db.add(STORE_NAME, result);
};

export const getAllResults = async () => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
};
export const clearResults = async () => {
    const db = await initDB();
    await db.clear(STORE_NAME);
}