import IMask from "imask";
import {
  DEFAULT_MASKS,
  DEFAULT_OPTIONS
} from "../../../constants/default-values";
import { MaskOptions } from "../../../constants/types";

export default function toCEP(
  value: string,
  options: Partial<MaskOptions> = {}
): string {
  const masked = IMask.createMask({
    ...DEFAULT_OPTIONS,
    ...options,
    lazy: options.placeholderLazyMode ?? DEFAULT_OPTIONS.placeholderLazyMode,
    mask: DEFAULT_MASKS.CEP
  });

  return masked.resolve(value);
}
