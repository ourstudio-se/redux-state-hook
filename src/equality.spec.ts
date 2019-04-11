import { isSame, isEqual } from "./equality";

describe("isSame() utility function", () => {
    it("is truthy for identity equality", () => {
        expect(isSame(1, 1)).toBeTruthy();
        expect(isSame("test", "test")).toBeTruthy();
        expect(isSame(true, true)).toBeTruthy();

        const o = { test: 1 };
        expect(isSame(o, o)).toBeTruthy();
    });
});

describe("isEqual() utility function", () => {
    it("is truthy for identity equality", () => {
        expect(isEqual(1, 1)).toBeTruthy();
        expect(isEqual("test", "test")).toBeTruthy();
        expect(isEqual(true, true)).toBeTruthy();

        const o = { test: 1 };
        expect(isEqual(o, o)).toBeTruthy();
    });
    it("is truthy for object equality", () => {
        const a = { test: 1, key: "value" };
        const b = { ...a };

        expect(isEqual(a, b)).toBeTruthy();
    });
    it("is falsy for objects with different number of keys", () => {
        const a = { test: 1, key: "value" };
        const b = { ...a, prop: "value" };

        expect(isEqual(a, b)).toBeFalsy();
    });
    it("is falsy for objects with different values for same number of keys", () => {
        const a = { test: 1, key: "value" };
        const b = { ...a, key: "test" };

        expect(isEqual(a, b)).toBeFalsy();
    });
});
