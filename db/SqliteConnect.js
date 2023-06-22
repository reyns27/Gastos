import * as SQLite from "expo-sqlite";

async function openDatabase(pathToDatabaseFile) {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require(pathToDatabaseFile)).uri,
    FileSystem.documentDirectory + "SQLite/Gastos.db"
  );
  return SQLite.openDatabase("Gastos.db");
}

export default openDatabase;
