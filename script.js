/* console.log(
  sanitizeLog("DEBUG: Server started on port 3000", ["a", "S", "r", "t"]),
); */

let logs_1 = [
  "INFO: Server started on port 3000",
  "DEBUG: user=admin token=abc123 connected",
  "WARN: High memory usage detected at 87%",
];

let logs_2 = [
  "FATAL: System overload detected, shutting down",
  "DEBUG: token=def456$ refreshed for session",
  "ERROR: Null pointer exception in module auth",
];

let logs_3 = [
  "ERROR: Failed to connect to db, retry=3",
  "DEBUG: api_key=XYZ789 used in request",
  "/INFO: Cache cleared successfully",
  "WARN: Disk usage at 92%, threshold=90%",
  "/INFO: Disk usage stabilized",
];
// Total Entry Count: 3. Sanitized Entry Count: 3. Informational Entry Count: 0. Finished sanitizing logs.

function sanitizeLog(entry, disallowedCharacters) {
  let result;
  let entrySplit = entry.split("");

  result = entrySplit
    .map((char) => {
      if (disallowedCharacters.includes(char)) {
        return "#";
      }
      return char;
    })
    .join("");

  return result;
}
console.log(
  sanitizeLog("DEBUG: Server started on port 3000", ["a", "S", "r", "t"]),
);

/* message = `Total Entry Count: ${entry.length} Sanitized Entry Count: 
      ${entry.length}. Informational Entry Count: ${count}. Finished sanitizing logs.`; */
// }

// sanitizeLog("DEBUG: Server started on port 3000",
// ["a", "S", "r", "t"]) should return the string DEBUG: #e#ve# s####ed on po## 3000.

function cleanLogs(entries, disallowedCharacters) {
  let count = 0;

  const sanitizedEntries = entries.map((entry) => {
    const cleaned = sanitizeLog(entry, disallowedCharacters);

    if (cleaned.startsWith("/$")) {
      count++;
    }

    return cleaned;
  });

  return `Total Entry Count: ${entries.length}. Sanitized Entry Count: ${sanitizedEntries.length}. Informational Entry Count: ${count}. Finished sanitizing logs.`;
}

console.log(cleanLogs(logs_2, ["a", "A", "c", "T"]));
