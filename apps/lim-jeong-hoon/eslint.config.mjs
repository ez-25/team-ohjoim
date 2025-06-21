import { nextJsConfig } from "@repo/eslint-config/next.js";

// 모노레포 패키지의 설정을 직접 사용
const eslintConfig = [...nextJsConfig];

export default eslintConfig;
