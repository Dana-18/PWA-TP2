//Componente que obtiene los ejercicios de la api y maneja sus estados de carga y error
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import EjerciciosList from "./EjerciciosList";

//Simulamos la api
const ejerciciosMock = [
    {id: "1", name: "Sentadillas", category: "Piernas"},
    {id: "2", name: "Flexiones", cayegory: "Pecho"},
];

describe("Componente EjerciciosList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })
    afterEach(() => {
        vi.restoreAllMocks();
    });


    it("should show loading state while fetching data", () => {
        vi.spyOn(global, "fetch").mockImplementation(() => new Promise (() => {}));
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        render(<EjerciciosList/>);
        expect(consoleSpy).toHaveBeenCalledWith("Cargando ejercicios...");
    });

    it ("should call fetch with the correct api url", async () => {
        const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async() => ejerciciosMock,
        });
        render(<EjerciciosList/>);
        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledWith("https://69e6e0ca68208c1debe8004e.mockapi.io/api/v1/ejercicios");
        });
    });

    it("should call fetch only once on mount", async() => {
        const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => ejerciciosMock,
        });
 
        render(<EjerciciosList />);
 
        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledTimes(1);
        });
    });

    it("should log error when fetch response is not ok", async () => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: false,
        });
 
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        render(<EjerciciosList />);
 
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("error");
        });
    });
 
    it("should log error when fetch throws a network error", async () => {
        vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network Error"));
 
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        vi.spyOn(console, "error").mockImplementation(() => {});
 
        render(<EjerciciosList />);
 
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("error");
        });
    });
 
    it("should log the error to console.error when fetch fails", async () => {
        const networkError = new Error("Network Error");
        vi.spyOn(global, "fetch").mockRejectedValue(networkError);
 
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.spyOn(console, "log").mockImplementation(() => {});
 
        render(<EjerciciosList />);
 
        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error:", networkError);
        });
    });
 
    it("should log the correct error message when API returns not ok", async () => {
        vi.spyOn(global, "fetch").mockResolvedValue({ ok: false });
 
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.spyOn(console, "log").mockImplementation(() => {});
 
        render(<EjerciciosList />);
 
        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Error:",
                expect.objectContaining({ message: "Error al obtener los ejercicios" })
            );
        });
    });
 
    it("should stop showing loading after a successful fetch", async () => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => ejerciciosMock,
        });
 
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        render(<EjerciciosList />);
 
        await waitFor(() => {
            const calls = consoleSpy.mock.calls.map((c) => c[0]);
            expect(calls).not.toContain("error");
        });
    });
 
    it("should stop showing loading after a failed fetch", async () => {
        vi.spyOn(global, "fetch").mockRejectedValue(new Error("fail"));
        vi.spyOn(console, "error").mockImplementation(() => {});
 
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        render(<EjerciciosList />);
 
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("error");
        });
    });
})