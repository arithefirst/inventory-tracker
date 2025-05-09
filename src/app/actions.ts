'use server';

import { db } from '@/db/drizzle';
import { items } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Updates a field on an item in the database
 * @param field The field to be updated
 * @param itemId ID of the item to update
 * @param newValue New value for the field being updated
 */
export async function updateDataValue(field: string, itemId: number, newValue: string | number) {
  console.log(`Updating field ${field}`);

  // If it's a customData field, pull the customData object and
  // apply the changes only to the needed field
  if (field.split('.')[0] === 'customData') {
    const key = field.split('.')[1];
    const result = await db
      .select({
        customData: items.customData,
      })
      .from(items)
      .where(eq(items.id, itemId));

    const { customData } = result[0];
    customData![key] = newValue;

    await db
      .update(items)
      .set({
        customData,
        updatedAt: new Date(),
      })
      .where(eq(items.id, itemId));
  }

  // Otherwise just update the field
  await db
    .update(items)
    .set({
      [field]: newValue,
      updatedAt: new Date(),
    })
    .where(eq(items.id, itemId));

  if (field === 'id') {
    redirect(`/item/${newValue}`);
  } else {
    revalidatePath(`/item/${itemId}`);
  }
}

export async function addCustomField(field: string, value: string | number, itemId: number) {
  const result = await db
    .select({
      customData: items.customData,
    })
    .from(items)
    .where(eq(items.id, itemId));

  let { customData } = result[0];
  if (!customData) customData = {};

  if (customData[field] === undefined) {
    customData[field] = value;
    await db
      .update(items)
      .set({
        customData,
        updatedAt: new Date(),
      })
      .where(eq(items.id, itemId));
  }

  revalidatePath(`/item/${itemId}`);
}
