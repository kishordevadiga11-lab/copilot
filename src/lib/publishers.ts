/**
 * Publisher lookup helpers for build-time data access.
 *
 * These queries read publisher records from the local SQLite database so Astro
 * pages can list and surface publisher metadata without a separate API.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieves every publisher sorted alphabetically by name.
 *
 * @param db - The database connection used to query publisher records.
 * @returns A list of publishers ordered by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({ id: row.id, name: row.name }));
}
