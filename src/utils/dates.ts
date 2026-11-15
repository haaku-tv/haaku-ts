/** Formats a date (or a `YYYY-MM-DD` string) as an API date segment. */
export function formatDate(input: string | Date): string {
  if (typeof input === "string") {
    return input;
  }

  const year = input.getFullYear();
  const month = String(input.getMonth() + 1).padStart(2, "0");
  const day = String(input.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
