import fs from "fs";
import path from "path";

/**
 * Проверяет наличие компонента по указанному пути.
 * @param {string} componentPath - Путь к компоненту относительно директории проекта.
 * @returns {boolean} - Возвращает true, если компонент существует, иначе false.
 */
export const checkComponentExists = (componentPath) => {
  const fullPath = path.join(process.cwd(), componentPath);
  return fs.existsSync(fullPath);
};
