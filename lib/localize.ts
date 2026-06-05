import type { Language, LocalizedText } from "@/lib/home-content";

export function localized(value: LocalizedText, language: Language) {
  return value[language] ?? value.en;
}
