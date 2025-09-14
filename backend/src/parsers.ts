import { parse as csvParse } from "csv-parse/sync";
import { XMLParser } from "fast-xml-parser";
import * as XLSX from "xlsx";

export type Parsed = Record<string, unknown>[];

export function parseCSV(buf: Buffer): Parsed {
  return csvParse(buf.toString("utf-8"), { columns: true, skip_empty_lines: true });
}

export function parseXLSX(buf: Buffer): Parsed {
  const wb = XLSX.read(buf, { type: "buffer" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet) as Parsed;
}

export function parseXML(buf: Buffer): Parsed {
  const parser = new XMLParser({ ignoreAttributes: false });
  const obj = parser.parse(buf.toString("utf-8"));
  return Array.isArray(obj) ? obj : [obj];
}

// Placeholder for EDI; in production integrate a proper EDI lib or bespoke mappers.
export function parseEDI(buf: Buffer): Parsed {
  return [{ raw: buf.toString("utf-8") }];
}
