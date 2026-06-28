import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { useContext, useEffect } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";

const fetchMock = vi.fn();

const AuthConsumer = () => {
    const { register, user } = useContext(AuthContext);

    useEffect(() => {
        register("Test User", "test@example.com", "123456");
    }, [register]);

    return <div>{user?.token ?? "no-token"}</div>;
};

describe("AuthContext", () => {
    beforeEach(() => {
        const storage = {
            getItem: vi.fn(() => null),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        };

        vi.stubGlobal("localStorage", storage);
        vi.stubGlobal("fetch", fetchMock);
        fetchMock.mockReset();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("obtiene un token automáticamente tras registrar un usuario", async () => {
        fetchMock
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 1, name: "Test User", email: "test@example.com" }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ token: "abc123", email: "test@example.com" }),
            });

        render(
            <AuthProvider>
                <AuthConsumer />
            </AuthProvider>
        );

        await waitFor(() => expect(screen.getByText("abc123")).toBeInTheDocument());

        const requestedUrls = fetchMock.mock.calls.map(([url]) => url);
        expect(requestedUrls.some((url) => url.includes("/auth/register"))).toBe(true);
        expect(requestedUrls.some((url) => url.includes("/auth/login"))).toBe(true);
    });
});
