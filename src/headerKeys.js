export default function headerKeys(table) {
  const rows = table.slice();
  const header = rows.shift();
  const result = [];
  for (const row of rows) {
    const obj = {};
    for (let column = 0; column < header.length; column++) {
      obj[header[column]] = row[column];
    }
    result.push(obj);
  }
  return result;
}
