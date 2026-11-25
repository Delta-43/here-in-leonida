/**
 * Content schema. Used by the build and CI only; never imported by the app bundle.
 * The app reads JSON generated from content that already passed these checks.
 */
import { z } from 'zod';

export const WORLD_HALF = 16_384;

const id = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'ids are lowercase words joined by hyphens');

export const spoilerLevel = z.enum(['none', 'location', 'solution', 'story', 'endgame']);
export const confidence = z.enum(['confirmed', 'unverified', 'approximate', 'unknown']);

const coordinate = z.number().min(-WORLD_HALF).max(WORLD_HALF);

export const position = z
  .object({ x: coordinate, y: coordinate, z: z.number().optional() })
  .strict();

export const source = z
  .object({
    type: z.enum(['in-game', 'gtadb', 'opengta6', 'contributor', 'other']),
    by: z.string().optional(),
    ref: z.string().optional(), // upstream id or commit
    licence: z.string().optional(),
    url: z.url().optional(),
  })
  .strict();

export const category = z
  .object({
    id,
    name: z.string().min(1),
    group: z.enum(['collectible', 'activity', 'place', 'service']),
    colour: z.string().regex(/^#[0-9a-f]{6}$/i),
    spoiler: spoilerLevel,
    total: z.number().int().positive().nullable(), // null until confirmed
    required_for_100: z.number().int().positive().nullable(),
    version: z.number().int().positive().optional(), // 1 = in version 1 scope
  })
  .strict();

export const location = z
  .object({
    id,
    category: id,
    name: z.string().min(1),
    position: position.nullable(), // null = location unknown; never guessed
    region: id.optional(),
    district: id.optional(),
    spoiler: spoilerLevel,
    confidence,
    verified_in: z.string().nullable().optional(),
    requires: z.array(z.string()).default([]),
    media: z.array(z.object({ file: z.string(), alt: z.string().min(1) }).strict()).default([]),
    sources: z.array(source).min(1, 'every location needs at least one source'),
  })
  .strict();

export type Category = z.infer<typeof category>;
export type Location = z.infer<typeof location>;
