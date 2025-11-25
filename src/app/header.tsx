"use client";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="border-b border-default-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Checker Maker
                </Link>
                <nav className="flex gap-4 items-center">
                    <Link href="/diagnostics" className="text-sm font-medium hover:text-primary transition-colors">
                        探す
                    </Link>
                    <Button as={Link} href="/create" color="primary" variant="flat" size="sm">
                        診断を作成
                    </Button>
                    <Button isIconOnly variant="light" onPress={toggleTheme} aria-label="Toggle theme">
                        {!mounted ? (
                            <Sun size={20} />
                        ) : resolvedTheme === 'dark' ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </Button>
                </nav>
            </div>
        </header>
    );
}