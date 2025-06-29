import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스명을 병합하고 충돌을 해결하는 유틸리티 함수
 * 
 * @description
 * - clsx: 조건부 클래스명 처리
 * - tailwind-merge: Tailwind CSS 클래스 충돌 해결
 * 
 * @example
 * ```typescript
 * cn("px-2 py-1", "px-4") // "py-1 px-4" - px-2가 px-4로 덮어씌워짐
 * cn("text-red-500", condition && "text-blue-500") // 조건부 클래스 적용
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}