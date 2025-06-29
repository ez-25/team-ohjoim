import type { TailwindClassCategories, TailwindCategoryKey, CVADefaultStyles } from "@/types/tailwind";
import { TAILWIND_CATEGORY_ORDER } from "@/types/tailwind";

/**
 * TailwindClassCategories 객체를 정의된 순서대로 문자열로 결합
 * 
 * @param categories - Tailwind 클래스 카테고리 객체
 * @returns 정렬된 클래스 문자열
 * 
 * @example
 * ```typescript
 * const classes = combineClassCategories({
 *   layout: "flex items-center",
 *   spacing: "px-4 py-2",
 *   visual: "bg-blue-500 rounded-md"
 * });
 * // "flex items-center px-4 py-2 bg-blue-500 rounded-md"
 * ```
 */
export function combineClassCategories(categories: TailwindClassCategories): string {
  return TAILWIND_CATEGORY_ORDER
    .map((key: TailwindCategoryKey) => {
      const value = categories[key];
      if (typeof value === "string") {
        return value;
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}

/**
 * CVA 기본 스타일을 결합하여 문자열로 변환
 * 
 * @param defaultStyles - CVA 기본 스타일 객체
 * @returns 결합된 기본 클래스 문자열
 * 
 * @example
 * ```typescript
 * const baseClasses = combineDefaultStyles({
 *   default: {
 *     layout: "flex justify-center",
 *     spacing: "p-4",
 *     visual: "bg-white border rounded"
 *   }
 * });
 * ```
 */
export function combineDefaultStyles(defaultStyles: CVADefaultStyles): string {
  return combineClassCategories(defaultStyles.default);
}

/**
 * 조건부 클래스를 병합하는 헬퍼 함수
 * 
 * @param baseClasses - 기본 클래스 문자열
 * @param conditionalClasses - 조건부 클래스 객체
 * @returns 병합된 클래스 문자열
 * 
 * @example
 * ```typescript
 * const classes = mergeConditionalClasses(
 *   "flex items-center p-4",
 *   {
 *     "bg-red-500": isError,
 *     "bg-green-500": isSuccess,
 *     "opacity-50": isDisabled
 *   }
 * );
 * ```
 */
export function mergeConditionalClasses(
  baseClasses: string,
  conditionalClasses: Record<string, boolean>
): string {
  const conditionalClassList = Object.entries(conditionalClasses)
    .filter(([, condition]) => condition)
    .map(([className]) => className);

  return [baseClasses, ...conditionalClassList].filter(Boolean).join(" ");
}

/**
 * 변형별 스타일을 정의된 카테고리로 구조화하는 헬퍼
 * 
 * @param variantStyles - 변형별 스타일 정의
 * @returns 구조화된 변형 스타일 객체
 * 
 * @example
 * ```typescript
 * const buttonVariants = createVariantStyles({
 *   size: {
 *     small: {
 *       sizing: "h-8",
 *       spacing: "px-3 py-1",
 *       typography: "text-sm"
 *     },
 *     large: {
 *       sizing: "h-12", 
 *       spacing: "px-6 py-3",
 *       typography: "text-lg"
 *     }
 *   }
 * });
 * ```
 */
export function createVariantStyles<T extends Record<string, Record<string, TailwindClassCategories>>>(
  variantStyles: T
): Record<keyof T, Record<string, string>> {
  const result = {} as Record<keyof T, Record<string, string>>;

  for (const [variantKey, variants] of Object.entries(variantStyles)) {
    result[variantKey as keyof T] = {};
    
    for (const [variantValue, categories] of Object.entries(variants)) {
      (result[variantKey as keyof T] as Record<string, string>)[variantValue] = combineClassCategories(categories);
    }
  }

  return result;
}

/**
 * 의미론적 변형 이름을 실제 클래스로 매핑하는 헬퍼
 * 
 * @example
 * ```typescript
 * const semanticVariants = {
 *   layout: {
 *     flexCenter: "flex justify-center items-center",
 *     gridCols3: "grid grid-cols-3",
 *     stackVertical: "flex flex-col"
 *   },
 *   visual: {
 *     primaryButton: "bg-blue-500 text-white border-blue-600",
 *     ghostButton: "bg-transparent border border-gray-300"
 *   }
 * };
 * ```
 */
export const createSemanticVariants = createVariantStyles;