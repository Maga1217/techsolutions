import { renderHook, act } from "@testing-library/react";
import useFormErrors from "./useForm";

describe("Hook useFormErrors", () => {
  it("deve começar sem erros", () => {
    const { result } = renderHook(() => useFormErrors());
    expect(result.current.errors.length).toBe(0);
  });

  it("deve guardar erros quando setFormErrors é chamado", () => {
    const { result } = renderHook(() => useFormErrors());

    act(() => {
      result.current.setFormErrors(["Erro 1", "Erro 2"]);
    });

    expect(result.current.errors.length).toBe(2);
    expect(result.current.errors[0]).toBe("Erro 1");
  });

  it("deve limpar os erros quando clearErrors é chamado", () => {
    const { result } = renderHook(() => useFormErrors());

    act(() => {
      result.current.setFormErrors(["Erro 1"]);
    });

    expect(result.current.errors.length).toBe(1);

    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors.length).toBe(0);
  });
});
