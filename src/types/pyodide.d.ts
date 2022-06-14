export class Pyodide {
  runPython(code: string): void;
  runPythonAsync(code: string): Promise<void>;
  loadPackage(packageName: string): Promise<void>;
}
