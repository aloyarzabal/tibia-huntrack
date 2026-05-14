import { fetchFromTibiaWikia } from "../modules/items/items.fetcher";
import { parseItemWikitext } from "../modules/items/items.parser";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import { items } from "../db/schemas/items";
import { eq, isNull } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

async function migratePrimaryTypes() {
  console.log("--- Iniciando actualización de items ---");

  // 1. Buscamos solo los que tienen el nuevo campo como NULL
  const itemsToUpdate = await db
    .select()
    .from(items)
    .where(isNull(items.primaryType));

  console.log(
    `Se han encontrado ${itemsToUpdate.length} items para actualizar.`,
  );

  for (const item of itemsToUpdate) {
    try {
      // 2. Llamamos a tu función externa (asumiendo que usa el nombre del item)
      const data = await fetchFromTibiaWikia(item.name);

      if (data) {
        const parsed = parseItemWikitext(data);

        if (parsed && parsed.primaryType) {
          // 3. Actualizamos el registro actual
          await db
            .update(items)
            .set({ primaryType: parsed.primaryType })
            .where(eq(items.name, item.name));

          console.log(`✅ Actualizado: ${item.name} -> ${parsed.primaryType}`);
        }
      } else {
        console.log(` Warning, nombre correcto pero sin info: ${item.name} `);
      }
    } catch (error) {
      console.error(`❌ Error actualizando ${item.name}:`, error);
    }
  }

  console.log("--- Proceso finalizado ---");
  process.exit(0);
}

migratePrimaryTypes();
